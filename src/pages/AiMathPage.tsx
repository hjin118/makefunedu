import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AiMathLayout from "./aimath/components/AiMathLayout";
import AimathHomePage from "./aimath/pages/AimathHomePage";
import UnitPage from "./aimath/pages/UnitPage";
import GlossaryPage from "./aimath/pages/GlossaryPage";
import NotebookPage from "./aimath/pages/NotebookPage";
import "./aimath/aimath.css";

// /aimath/* 서브앱 라우트 — App.tsx의 <Route path="aimath/*"> 아래에서 상대 경로로 붙어요.
export default function AiMathPage() {
  const { pathname } = useLocation();

  // 단원 페이지에서만 html[data-aiunit]을 켜 단원별 포인트 색을 적용해요.
  useEffect(() => {
    const match = pathname.match(/\/aimath\/u([1-5])\/?$/);
    if (match) {
      document.documentElement.dataset.aiunit = match[1];
    } else {
      delete document.documentElement.dataset.aiunit;
    }
  }, [pathname]);

  return (
    <AiMathLayout>
      <Routes>
        <Route index element={<AimathHomePage />} />
        <Route path=":unitId" element={<UnitPage />} />
        <Route path="glossary" element={<GlossaryPage />} />
        <Route path="notebook" element={<NotebookPage />} />
        <Route path="*" element={<Navigate to="/aimath" replace />} />
      </Routes>
    </AiMathLayout>
  );
}
