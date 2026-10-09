import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("root 엘리먼트를 찾지 못했어요.");
}

// GitHub Pages(/makefunedu/)처럼 하위 경로 배포일 때 라우터 기준점을 맞춰요.
// 루트(/) 배포(Firebase 등)에서는 basename을 끄요.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
