import { useState } from "react";

type CopyButtonProps = {
  text: string;
  label?: string;
  className?: string;
};

async function writeClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // 파일로 열었거나 보안 컨텍스트가 아닐 때의 보조 경로
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    const ok = document.execCommand("copy");
    if (!ok) throw new Error("clipboard copy failed");
  } finally {
    document.body.removeChild(textarea);
  }
}

export default function CopyButton({ text, label = "📋 복사", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await writeClipboard(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("클립보드 복사에 실패했어요.", err);
    }
  }

  return (
    <button
      type="button"
      className={className ? `btn btn-small ${className}` : "btn btn-small"}
      onClick={handleClick}
    >
      {copied ? "복사됐어요" : label}
    </button>
  );
}
