"use client";

import { useEffect, useRef, useState } from "react";

interface CommandBlockProps {
  code: string;
  copyLabel: string;
  copiedLabel: string;
  copyFailedLabel: string;
}

export function CommandBlock({ code, copyLabel, copiedLabel, copyFailedLabel }: CommandBlockProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
  }, []);

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setStatus("idle"), 2200);
  };

  const message = status === "copied" ? copiedLabel : status === "failed" ? copyFailedLabel : "";

  return (
    <div className="command-block">
      <pre tabIndex={0}><code>{code}</code></pre>
      <button type="button" onClick={copy}>{status === "copied" ? copiedLabel : copyLabel}</button>
      <span className="sr-only" role="status" aria-live="polite">{message}</span>
    </div>
  );
}
