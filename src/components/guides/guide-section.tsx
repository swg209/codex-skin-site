import type { GuideContent, GuideSection as GuideSectionData } from "@/content";

import { CommandBlock } from "./command-block";
import { PromptBlock } from "./prompt-block";

export function GuideSection({ section, content }: { section: GuideSectionData; content: GuideContent }) {
  return (
    <section id={section.id} className={`guide-section guide-section--${section.tone ?? "default"}`}>
      <h2>{section.title}</h2>
      {section.blocks.map((block, index) => {
        if (block.type === "paragraph") return <p key={index}>{block.text}</p>;
        if (block.type === "list") return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
        if (block.type === "prompt") {
          return (
            <PromptBlock
              key={index}
              text={block.text}
              copyLabel={content.promptCopyLabel}
              copiedLabel={content.promptCopiedLabel}
              copyFailedLabel={content.promptCopyFailedLabel}
            />
          );
        }
        return <CommandBlock key={index} code={block.code} copyLabel={content.copyLabel} copiedLabel={content.copiedLabel} copyFailedLabel={content.copyFailedLabel} />;
      })}
    </section>
  );
}
