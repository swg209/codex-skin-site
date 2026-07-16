"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { GalleryItem } from "@/content";
import { contentByLocale } from "@/content";
import type { Locale } from "@/lib/site";

interface ThemeGalleryProps {
  locale: Locale;
  items: GalleryItem[];
}

export function ThemeGallery({ locale, items }: ThemeGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const labels = contentByLocale[locale].home.labels;
  const open = activeIndex !== null;

  const close = useCallback(() => {
    const index = activeIndex;
    setActiveIndex(null);
    window.requestAnimationFrame(() => {
      if (index !== null) triggerRefs.current[index]?.focus();
    });
  }, [activeIndex]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((value) =>
          value === null ? 0 : (value + 1) % items.length,
        );
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((value) =>
          value === null ? 0 : (value - 1 + items.length) % items.length,
        );
      }

      if (event.key === "Tab" && dialogRef.current) {
        const controls = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open, items.length]);

  const activeItem = activeIndex === null ? null : items[activeIndex];
  const currentIndex = activeIndex ?? 0;

  return (
    <>
      <div className="theme-grid">
        {items.map((item, index) => (
          <button
            key={item.src}
            ref={(node) => {
              triggerRefs.current[index] = node;
            }}
            className="theme-card"
            type="button"
            aria-label={`${labels.viewTheme}: ${item.name}`}
            onClick={() => setActiveIndex(index)}
          >
            <span className="theme-card__image">
              <Image
                src={item.src}
                alt={item.description}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </span>
            <span className="theme-card__copy">
              <strong>{item.name}</strong>
              <span>{item.description}</span>
            </span>
          </button>
        ))}
      </div>

      {activeItem ? (
        <div
          className="lightbox"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            className="lightbox__dialog"
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.name}
          >
            <div className="lightbox__toolbar">
              <div>
                <strong>{activeItem.name}</strong>
                <span>{activeItem.description}</span>
              </div>
              <button type="button" aria-label={labels.close} onClick={close}>×</button>
            </div>
            <div className="lightbox__image">
              <Image src={activeItem.src} alt={activeItem.description} fill sizes="92vw" priority />
            </div>
            <div className="lightbox__controls">
              <button type="button" aria-label={labels.previous} onClick={() => setActiveIndex((currentIndex - 1 + items.length) % items.length)}>←</button>
              <span>{currentIndex + 1} / {items.length}</span>
              <button type="button" aria-label={labels.next} onClick={() => setActiveIndex((currentIndex + 1) % items.length)}>→</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
