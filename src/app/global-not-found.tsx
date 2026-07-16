import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "404 – Page Not Found | CodexSkin",
  description: "The requested CodexSkin page could not be found.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main id="main-content" className="not-found container">
          <p className="eyebrow">CodexSkin</p>
          <h1>404</h1>
          <p className="lead">This page does not exist. Choose a starting point below.</p>
          <div className="button-row">
            <Link className="button button--primary" href="/">English home</Link>
            <Link className="button" href="/zh">中文首页</Link>
            <Link className="button" href="/install/windows">Windows guide</Link>
            <Link className="button" href="/install/macos">macOS guide</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
