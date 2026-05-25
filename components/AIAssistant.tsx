import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  X,
  Send,
  Loader2,
  Minus,
  Maximize2,
  Sparkles,
  User,
  BrainCircuit,
  ExternalLink,
  AlertCircle,
  Clock,
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import {
  PERSONAL_INFO,
  SKILL_GROUPS,
  EXPERIENCES,
  PROJECTS,
} from "../constants";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FormattedMessage: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split("\n");
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        if (line.trim().startsWith("* ") || line.trim().startsWith("- ")) {
          const text = line.trim().substring(2);
          return (
            <div key={i} className="flex gap-2 ml-2">
              <span className="text-blue-500 font-bold">•</span>
              <span>{renderInline(text)}</span>
            </div>
          );
        }
        return (
          <p key={i} className="min-h-[1.25rem]">
            {renderInline(line)}
          </p>
        );
      })}
    </div>
  );
};

function renderInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-black text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("[") && part.includes("](")) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-0.5 font-bold"
          >
            {match[1]}
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        );
      }
    }
    return part;
  });
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm Kashish's AI assistant. I'm powered by Gemini Flash. I can analyze her architectural choices at KaptureCX or her technical projects in detail. What can I help you with today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check for the API Key from the environment (Vite client-side variable)
  const apiKey = (import.meta as any).env?.VITE_API_KEY;
  const aiClientRef = React.useRef<InstanceType<typeof GoogleGenAI> | null>(
    null,
  );

  // Initialize and reuse the GenAI client to reduce cold-init delays.
  useEffect(() => {
    if (!apiKey) return;
    try {
      aiClientRef.current = new GoogleGenAI({ apiKey });
    } catch (e) {
      console.error("Failed to instantiate GoogleGenAI client", e);
    }
  }, [apiKey]);

  const resumeContext = `
    User Profile: ${JSON.stringify(PERSONAL_INFO)}
    Skills: ${JSON.stringify(SKILL_GROUPS)}
    Experience: ${JSON.stringify(EXPERIENCES)}
    Projects: ${JSON.stringify(PROJECTS)}
    
    Instructions: You are the personal AI agent for Kashish Gupta. Answer questions professionally and concisely. 
    Use female pronouns (she/her) when referring to Kashish.
    
    CRITICAL FORMATTING RULES:
    1. Always use line breaks between different pieces of information.
    2. Use bullet points (starting with '*') for lists.
    3. Use bolding (**text**) for names or roles.
    4. Provide URLs in markdown format: [Text](URL).
  `;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isThinking]);

  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || isLoading) return;

    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: textToSend },
        {
          role: "assistant",
          content:
            "API Key not found. Please ensure API_KEY is set in Vercel environment variables.",
        },
      ]);
      setInput("");
      return;
    }

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsThinking(true);

    try {
      // Reuse client if available to avoid repeated cold initializations
      const client = aiClientRef.current ?? new GoogleGenAI({ apiKey });
      if (!aiClientRef.current) aiClientRef.current = client;

      const payload = {
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map((m) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }],
          })),
          { role: "user", parts: [{ text: textToSend }] },
        ],
        config: {
          systemInstruction: resumeContext,
          temperature: 0.7,
          thinkingConfig: { thinkingBudget: 8000 },
        },
      };

      // retry loop with exponential backoff for transient errors (429 / network)
      const maxRetries = 3;
      let attempt = 0;
      const baseDelay = 700;
      let response: any = null;

      while (attempt < maxRetries) {
        try {
          response = await client.models.generateContent(payload as any);
          break;
        } catch (err: any) {
          attempt += 1;
          const msg = err?.message || err;
          const isRetryable =
            err?.status === 429 ||
            /429|Rate Limit|ResourceExhausted|ECONNRESET|timeout/i.test(
              String(msg),
            );
          console.warn(`GenAI call failed (attempt ${attempt}):`, msg);
          if (!isRetryable || attempt >= maxRetries) throw err;
          // notify user once about retry
          if (attempt === 1) {
            setMessages((prev) => [
              ...prev,
              {
                role: "assistant",
                content: "Transient API error detected — retrying request...",
              },
            ]);
          }
          const delay = baseDelay * Math.pow(2, attempt - 1);
          await new Promise((res) => setTimeout(res, delay));
        }
      }

      const assistantMessage: Message = {
        role: "assistant",
        content:
          response?.text ||
          "I processed that request but couldn't generate a text response.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("AI Error:", error);
      let errorContent =
        "I encountered an error. Please check the console for details.";
      if (
        error?.status === 429 ||
        (error?.message &&
          /429|Rate Limit|ResourceExhausted/i.test(error.message))
      ) {
        errorContent =
          "I'm receiving too many requests right now. Try again in a few seconds.";
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorContent },
      ]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const quickActions = [
    "Micro-Frontend strategy",
    "AI in CRM",
    "Contact Details",
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-5 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-500 transition-all group"
      >
        <div className="relative">
          <Bot className="w-8 h-8" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-100"></span>
          </span>
        </div>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-500 ease-in-out ${
        isMinimized
          ? "bottom-8 right-8 w-72"
          : "bottom-8 right-8 w-full max-w-[450px] h-[600px] max-h-[85vh]"
      }`}
    >
      <div className="w-full h-full bg-gray-950 border border-gray-800 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-3xl">
        <div className="p-6 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="text-sm font-bold text-white">AI Assistant</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                Gemini 3 Flash
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!apiKey && <AlertCircle className="w-4 h-4 text-amber-500" />}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-gray-500 hover:text-white"
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4" />
              ) : (
                <Minus className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-900 text-gray-300 border border-gray-800"
                    } ${msg.content.includes("Rate Limit") ? "border-amber-500/50 bg-amber-500/5 text-amber-200" : ""}`}
                  >
                    {msg.content.includes("Rate Limit") && (
                      <Clock className="w-4 h-4 mb-2 opacity-50" />
                    )}
                    <FormattedMessage content={msg.content} />
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="p-4 bg-gray-900/50 text-purple-400 text-[10px] font-bold uppercase tracking-widest rounded-2xl flex items-center gap-2 border border-purple-500/20">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Analyzing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="px-6 pb-2 overflow-x-auto flex gap-2">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(action)}
                  className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg text-[10px] text-gray-400 whitespace-nowrap hover:border-blue-500/50 hover:text-white transition-all"
                >
                  {action}
                </button>
              ))}
            </div>

            <div className="p-6 border-t border-gray-800">
              <form
                className="relative"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something..."
                  disabled={isLoading}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white disabled:opacity-50 transition-all hover:bg-blue-500"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
