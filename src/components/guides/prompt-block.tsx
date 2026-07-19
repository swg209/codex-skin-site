"use client";

import { useEffect, useRef, useState } from "react";

interface PromptBlockProps {
  text: string;
  copyLabel: string;
  copiedLabel: string;
  copyFailedLabel: string;
}

export function PromptBlock({ text, copyLabel, copiedLabel, copyFailedLabel }: PromptBlockProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
  }, []);

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }

    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setStatus("idle"), 2200);
  };

  const message = status === "copied" ? copiedLabel : status === "failed" ? copyFailedLabel : "";

  return (
    <div className="prompt-block">
      <p tabIndex={0}>{text}</p>
      <button type="button" onClick={copy}>{status === "copied" ? copiedLabel : copyLabel}</button>
      <span className="sr-only" role="status" aria-live="polite">{message}</span>
    </div>
  );
}
