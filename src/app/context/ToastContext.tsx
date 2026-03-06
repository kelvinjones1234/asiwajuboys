"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { X, Check, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const TOAST_DURATION = 4000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Global Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// Hook to use the toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Individual Toast UI Component
function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: () => void;
}) {
  const [isShowing, setIsShowing] = useState(false);
  const [progress, setProgress] = useState(100);

  // Trigger enter animation and progress bar countdown
  useEffect(() => {
    requestAnimationFrame(() => setIsShowing(true));

    // Start shrinking the progress bar after a tiny delay to ensure transition triggers
    const progressTimer = setTimeout(() => {
      setProgress(0);
    }, 50);

    return () => clearTimeout(progressTimer);
  }, []);

  const icons = {
    success: <Check className="w-4 h-4" strokeWidth={2} />,
    error: <AlertCircle className="w-4 h-4" strokeWidth={2} />,
    info: <Info className="w-4 h-4" strokeWidth={2} />,
  };

  // Styling mapped to the new design system
  const styles = {
    success: {
      container: "border-[var(--color-brand-primary)]",
      iconBox: "bg-[var(--color-brand-primary)] text-[var(--color-on-brand)]",
      progressBar: "bg-[var(--color-brand-primary)]",
    },
    error: {
      container: "border-red-500",
      iconBox: "bg-red-500 text-white",
      progressBar: "bg-red-500",
    },
    info: {
      container: "border-[var(--color-border-strong)]",
      iconBox:
        "bg-[var(--color-border-strong)] text-[var(--color-text-primary)]",
      progressBar: "bg-[var(--color-text-primary)]",
    },
  };

  return (
    <div
      className={`pointer-events-auto relative overflow-hidden flex items-center justify-between min-w-[320px] max-w-sm p-2 rounded-full border bg-[var(--color-bg-surface)] shadow-lg transition-all duration-500 ease-out transform ${
        isShowing
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-12 opacity-0 scale-95"
      } ${styles[toast.type].container}`}
    >
      {/* Subtle grain texture matching the design system */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          opacity: 0.5,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Content Container (Above background texture) */}
      <div className="relative z-10 flex items-center gap-3 w-full pl-1">
        {/* State Icon in a circular wrapper */}
        <div
          className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center shadow-sm ${styles[toast.type].iconBox}`}
        >
          {icons[toast.type]}
        </div>

        {/* Message Text */}
        <p className="flex-1 text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] mt-0.5 line-clamp-2 leading-tight">
          {toast.message}
        </p>

        {/* Close Button - Styled like Hero Arrow Button */}
        <button
          onClick={() => {
            setIsShowing(false);
            setTimeout(onRemove, 300); // Wait for exit animation
          }}
          className="w-10 h-10 mr-1 rounded-full border border-[var(--color-border-strong)] flex items-center justify-center shrink-0 hover:bg-[var(--color-bg-primary)] transition-colors bg-white/50 text-[var(--color-text-primary)] focus:outline-none group"
        >
          <X
            className="w-4 h-4 group-hover:scale-110 transition-transform"
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* The Animated Progress Bar */}
      <div
        className={`absolute bottom-0 left-0 h-[3px] opacity-40 transition-all ease-linear z-20 ${styles[toast.type].progressBar}`}
        style={{
          width: `${progress}%`,
          transitionDuration: `${TOAST_DURATION}ms`,
        }}
      />
    </div>
  );
}
