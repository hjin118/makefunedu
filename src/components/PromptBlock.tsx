import type { ReactNode } from "react";
import CopyButton from "./CopyButton";

type PromptBlockProps = {
  title?: string;
  text: string;
  note?: ReactNode;
};

export default function PromptBlock({ title, text, note }: PromptBlockProps) {
  return (
    <div className="prompt-block">
      <div className="prompt-head">
        <strong>{title ?? ""}</strong>
        <CopyButton text={text} label="📋 복사" />
      </div>
      <pre>{text}</pre>
      {note ? <p className="footnote">{note}</p> : null}
    </div>
  );
}
