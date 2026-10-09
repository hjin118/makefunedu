import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  intro?: ReactNode;
};

export default function PageHeader({ title, intro }: PageHeaderProps) {
  return (
    <header className="page-header">
      <Link className="home-link" to="/">
        <img
          className="home-link-avatar"
          src="/images/hongjin-favicon-128.png"
          alt=""
          width={22}
          height={22}
        />
        메이크펀에듀
      </Link>
      <h1>{title}</h1>
      {intro ? <div className="page-intro">{intro}</div> : null}
    </header>
  );
}
