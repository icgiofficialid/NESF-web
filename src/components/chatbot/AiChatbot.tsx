
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, RotateCcw, Square, ChevronDown, Sparkles } from "lucide-react";
import { useChatbot, ChatbotConfig, ChatMessage } from "./useChatbot";

// ── SNOWFLAKE MARK (neutral, works on any bg) ─────────────────────
const BotIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="2"  r="1.2" fill="currentColor" stroke="none" />
    <circle cx="12" cy="22" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="2"  cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="22" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="4.93"  cy="4.93"  r="1" fill="currentColor" stroke="none" />
    <circle cx="19.07" cy="19.07" r="1" fill="currentColor" stroke="none" />
    <circle cx="19.07" cy="4.93"  r="1" fill="currentColor" stroke="none" />
    <circle cx="4.93"  cy="19.07" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// ── TYPING DOTS ───────────────────────────────────────────────────
const TypingDots = () => (
  <div className="flex items-center gap-1 py-1">
    {[0, 1, 2].map(i => (
      <motion.span
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-current opacity-40"
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
      />
    ))}
  </div>
);

// ── SINGLE MESSAGE BUBBLE ─────────────────────────────────────────
const MessageBubble = ({
  message,
  accentColor,
  accentForeground,
  isLast,
  isLoading,
}: {
  message: ChatMessage;
  accentColor: string;
  accentForeground: string;
  isLast: boolean;
  isLoading: boolean;
}) => {
  const isUser = message.role === "user";
  const showTyping = isLast && !isUser && isLoading && message.content === "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: accentColor, color: accentForeground }}
        >
          <BotIcon size={14} />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-tr-sm"
            : "rounded-tl-sm"
        }`}
        style={
          isUser
            ? {
                background: accentColor,
                color: accentForeground,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }
            : {
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.09)",
                color: "rgba(255,255,255,0.9)",
              }
        }
      >
        {showTyping ? (
          <TypingDots />
        ) : (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        )}
      </div>
    </motion.div>
  );
};

// ── WELCOME SCREEN ────────────────────────────────────────────────
const WelcomeScreen = ({
  botName,
  welcomeMessage,
  accentColor,
  accentForeground,
  onSend,
}: {
  botName: string;
  welcomeMessage: string;
  accentColor: string;
  accentForeground: string;
  onSend: (text: string) => void;
}) => {
const suggestions = [
  "How do I register?",
  "What are the competition categories?",
  "When is the event schedule?",
  "How to contact the committee?",
];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center px-4 py-6 gap-5"
    >
      {/* Bot avatar */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: accentColor,
          color: accentForeground,
          boxShadow: `0 8px 32px ${accentColor}40`,
        }}
      >
        <BotIcon size={28} />
      </motion.div>

      <div className="space-y-1.5">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
          AI Assistant
        </p>
        <h3 className="text-base font-semibold text-white">{botName}</h3>
      </div>

      <p className="text-sm leading-6" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "260px" }}>
        {welcomeMessage}
      </p>

      {/* Quick suggestions */}
      <div className="w-full grid grid-cols-2 gap-2 mt-1">
        {suggestions.map((s, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
            onClick={() => onSend(s)}
            className="text-left text-[11px] px-3 py-2.5 rounded-xl transition-all hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {s}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────
interface AiChatbotProps {
  config: ChatbotConfig;
  /** Posisi tombol: "bottom-right" (default) | "bottom-left" */
  position?: "bottom-right" | "bottom-left";
}

const AiChatbot = ({ config, position = "bottom-right" }: AiChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { messages, isLoading, error, sendMessage, clearMessages, stopGeneration } = useChatbot(config);

  const posClass = position === "bottom-left"
    ? "bottom-5 left-5"
    : "bottom-5 right-5";

  const panelPos = position === "bottom-left"
    ? "bottom-20 left-5"
    : "bottom-20 right-5";

  // Auto scroll
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    }
  }, [messages, isOpen]);

  // Focus input saat dibuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <>
      {/* ── CHAT PANEL ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed ${panelPos} z-50 flex flex-col`}
            style={{
              width: "min(380px, calc(100vw - 24px))",
              height: "min(580px, calc(100vh - 120px))",
              background: "linear-gradient(160deg, #0f0f0f 0%, #0a0a0a 100%)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "20px",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3.5 shrink-0"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: config.accentColor, color: config.accentForeground }}
                >
                  <BotIcon size={15} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-white leading-none">{config.botName}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "#22c55e",
                        boxShadow: "0 0 4px #22c55e",
                        animation: "pulse-dot 2s ease-in-out infinite",
                      }}
                    />
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Online</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {hasMessages && (
                  <button
                    onClick={clearMessages}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white/8"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                    title="Clear chat"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white/8"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Accent line */}
            <div
              className="h-px shrink-0"
              style={{
                background: `linear-gradient(90deg, transparent, ${config.accentColor}60, transparent)`,
              }}
            />

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
            >
              {!hasMessages ? (
                <WelcomeScreen
                  botName={config.botName}
                  welcomeMessage={config.welcomeMessage}
                  accentColor={config.accentColor}
                  accentForeground={config.accentForeground}
                  onSend={(text) => {
                    sendMessage(text);
                  }}
                />
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <MessageBubble
                      key={msg.id}
                      message={msg}
                      accentColor={config.accentColor}
                      accentForeground={config.accentForeground}
                      isLast={i === messages.length - 1}
                      isLoading={isLoading}
                    />
                  ))}

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-xs py-2 px-3 rounded-xl"
                      style={{ background: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}
                    >
                      {error}
                    </motion.div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div
              className="px-3 py-3 shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div
                className="flex items-end gap-2 rounded-2xl px-3.5 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tulis pesan..."
                  rows={1}
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm resize-none outline-none leading-5"
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    maxHeight: "100px",
                    scrollbarWidth: "none",
                  }}
                  onInput={e => {
                    const t = e.currentTarget;
                    t.style.height = "auto";
                    t.style.height = Math.min(t.scrollHeight, 100) + "px";
                  }}
                />

                {/* Send / Stop button */}
                <motion.button
                  onClick={isLoading ? stopGeneration : handleSend}
                  disabled={!isLoading && !input.trim()}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    background: isLoading ? "rgba(239,68,68,0.8)" : config.accentColor,
                    color: isLoading ? "#fff" : config.accentForeground,
                  }}
                >
                  {isLoading
                    ? <Square className="w-3.5 h-3.5" />
                    : <Send className="w-3.5 h-3.5" />
                  }
                </motion.button>
              </div>

              <p className="text-center text-[10px] mt-2" style={{ color: "rgba(255,255,255,0.18)" }}>
                Powered by ICGI · {config.botName}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FLOATING BUTTON ── */}
      <div className={`fixed ${posClass} z-50`}>
        <AnimatePresence mode="wait">
          {isOpen ? (
            /* Tombol close kecil */
            <motion.button
              key="close"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsOpen(false)}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(12px)",
              }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          ) : (
            /* Tombol chat utama */
            <motion.button
              key="open"
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              className="w-14 h-14 rounded-full flex items-center justify-center relative"
              style={{
                background: config.accentColor,
                color: config.accentForeground,
                boxShadow: `0 8px 32px ${config.accentColor}55, 0 2px 8px rgba(0,0,0,0.3)`,
              }}
            >
              {/* Ping ring */}
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ border: `2px solid ${config.accentColor}` }}
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />

              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AiChatbot;