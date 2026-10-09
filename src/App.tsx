import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import RouteTitles from "./components/RouteTitles";
import HomePage from "./pages/HomePage";
import SetupPage from "./pages/SetupPage";
import PromptPage from "./pages/PromptPage";
import SlidesPage from "./pages/SlidesPage";
import HandgenPage from "./pages/HandgenPage";
import GamegenPage from "./pages/GamegenPage";
import CodePage from "./pages/code/CodePage";
import AiMathPage from "./pages/AiMathPage";
import PhysicalAiPage from "./pages/esp32/PhysicalAiPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <main className="container page">
      <h1>페이지를 못 찾았어요</h1>
      <p>주소를 다시 확인해 주세요.</p>
      <Link className="btn" to="/">
        처음으로 가기 →
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <RouteTitles />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/prompt" element={<PromptPage />} />
        <Route path="/slides" element={<SlidesPage />} />
        <Route path="/handgen" element={<HandgenPage />} />
        <Route path="/gamegen" element={<GamegenPage />} />
        <Route path="/coding" element={<CodePage />} />
        <Route path="/esp32" element={<PhysicalAiPage />} />
        <Route path="/aimath/*" element={<AiMathPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
