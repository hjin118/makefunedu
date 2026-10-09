import { useState, type ReactNode } from "react";

type ExpandableCardProps = {
  tag: string;
  title: string;
  short: string;
  /** 있으면 [더보기]/[접기] 버튼이 나타나요. */
  long?: string;
  /** 카드 아래 CTA 영역 */
  children?: ReactNode;
};

export default function ExpandableCard({ tag, title, short, long, children }: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="card card-hover">
      <span className="tag">{tag}</span>
      <h2>{title}</h2>
      <p>{expanded && long ? long : short}</p>
      {long ? (
        <button
          type="button"
          className="btn btn-small"
          aria-expanded={expanded}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "접기" : "더보기"}
        </button>
      ) : null}
      {children ? <div className="card-cta">{children}</div> : null}
    </article>
  );
}
