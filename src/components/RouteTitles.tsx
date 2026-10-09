import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_TITLE = "메이크펀에듀 — 홍진샘과 함께하는 수업자료";

const TITLES: Array<[string, string]> = [
  ["/", BASE_TITLE],
  ["/setup", "AI 맞춤 설정 | 메이크펀에듀"],
  ["/prompt", "다시 묻는 AI 교실 | 메이크펀에듀"],
  ["/slides", "슬라이드 프롬프트 | 메이크펀에듀"],
  ["/handgen", "학습 사이트 만들기 | 메이크펀에듀"],
  ["/gamegen", "바이브코딩 게임 만들기 | 메이크펀에듀"],
  ["/coding", "코딩 단원 | 메이크펀에듀"],
  ["/esp32", "피지컬 AI (ESP32) | 메이크펀에듀"],
  ["/microbit", "마이크로비트 | 메이크펀에듀"],
  ["/arduino", "아두이노(엠블록) | 메이크펀에듀"],
  ["/aimath", "인공지능 수학 | 메이크펀에듀"],
];

export default function RouteTitles() {
  const { pathname } = useLocation();

  useEffect(() => {
    const match = TITLES.find(([path]) =>
      path === "/" ? pathname === "/" : pathname.startsWith(path),
    );
    document.title = match ? match[1] : BASE_TITLE;
  }, [pathname]);

  return null;
}
