// 인공지능 수학 — 단원별 용어 사전 데이터

import type { UnitId } from "./units";

export type GlossaryTerm = {
  term: string;
  en: string;
  def: string;
};

export const GLOSSARY: Record<UnitId, readonly GlossaryTerm[]> = {
  u1: [
    { term: "빅데이터", en: "Big data", def: "규모가 크고 빠르게 늘어나며 종류가 다양한 데이터예요." },
    { term: "데이터", en: "Data", def: "관찰하거나 기록한 사실이에요. 인공지능이 배우는 재료예요." },
    { term: "3V", en: "Three Vs", def: "규모(Volume)·속도(Velocity)·다양성(Variety)을 말해요." },
    { term: "분류", en: "Classification", def: "정해진 묶음 중 하나를 골라 붙이는 일이에요." },
    { term: "예측", en: "Prediction", def: "값을 수로 헤아려 맞혀 보는 일이에요." },
    { term: "정확도", en: "Accuracy", def: "전체 중에서 바르게 맞힌 비율이에요." },
    { term: "학습 데이터", en: "Training data", def: "모델을 가르칠 때 쓰는 데이터예요." },
    { term: "검증 데이터", en: "Test data", def: "모델의 실력을 시험할 때 쓰는, 처음 보는 데이터예요." },
  ],
  u2: [
    { term: "토큰화", en: "Tokenization", def: "문장을 잘게 쪼개어 다루는 단위로 나누는 일이에요." },
    { term: "토큰", en: "Token", def: "토큰화로 쪼개진 조각이에요." },
    { term: "형태소", en: "Morpheme", def: "뜻을 가진 가장 작은 말의 단위예요." },
    { term: "조사", en: "Particle", def: "명사 뒤에 붙어 문장 안 역할을 알려 주는 말이에요. '이', '을'이 예예요." },
    { term: "빈도", en: "Frequency", def: "어떤 단어가 나온 횟수예요." },
    { term: "불용어", en: "Stopword", def: "너무 자주 나와 정보가 별로 없는 말이에요." },
    { term: "감성 분석", en: "Sentiment analysis", def: "글이 긍정인지 부정인지 판단하는 일이에요." },
    { term: "텍스트 마이닝", en: "Text mining", def: "글에서 유용한 정보를 뽑아 내는 분석이에요." },
  ],
  u3: [
    { term: "픽셀", en: "Pixel", def: "이미지를 이루는 가장 작은 점이에요." },
    { term: "해상도", en: "Resolution", def: "픽셀이 얼마나 촘촘한지 나타내요." },
    { term: "밝기", en: "Brightness", def: "한 픽셀이 얼마나 밝은지 나타내는 값이에요." },
    { term: "그레이스케일", en: "Grayscale", def: "색을 빼고 밝기만 남긴 회색 표현이에요." },
    { term: "이진화", en: "Binarization", def: "임계값을 기준으로 검정과 흰색 둘로 나누는 일이에요." },
    { term: "임계값", en: "Threshold", def: "검정과 흰색을 가르는 기준 값이에요." },
    { term: "합성곱", en: "Convolution", def: "한 칸과 주변 칸을 함께 더해 보는 연산이에요." },
    { term: "특징", en: "Feature", def: "이미지에서 대상을 구별하는 단서예요. 윤곽이나 무늬가 예예요." },
  ],
  u4: [
    { term: "선형 회귀", en: "Linear regression", def: "데이터에 가장 잘 맞는 직선을 찾는 방법이에요." },
    { term: "기울기", en: "Slope", def: "x가 1 늘 때 y가 늘어나는 양이에요." },
    { term: "절편", en: "Intercept", def: "직선이 y축과 만나는 위치예요." },
    { term: "잔차", en: "Residual", def: "실제 값과 예측한 값의 차이예요." },
    { term: "오차 제곱 합", en: "Sum of squared errors", def: "잔차를 제곱해 모두 더한 값이에요." },
    { term: "최소제곱법", en: "Method of least squares", def: "오차 제곱 합이 가장 작은 직선을 찾는 원리예요." },
    { term: "경사하강법", en: "Gradient descent", def: "오차를 한 걸음씩 줄여 가며 최솟값을 찾는 방법이에요." },
    { term: "예측값", en: "Predicted value", def: "찾은 직선으로 계산한 값이에요." },
  ],
  u5: [
    { term: "탐구", en: "Inquiry", def: "궁금증에서 출발해 자료로 답을 찾는 활동이에요." },
    { term: "가설", en: "Hypothesis", def: "확인할 수 있는 형태로 세운 잠정적인 답이에요." },
    { term: "변인", en: "Variable", def: "탐구에서 값이 변할 수 있는 요소예요." },
    { term: "독립 변인", en: "Independent variable", def: "내가 바꾸어 보는 변인이에요." },
    { term: "종속 변인", en: "Dependent variable", def: "독립 변인을 따라 변하는, 재어 보는 변인이에요." },
    { term: "자료 수집", en: "Data collection", def: "가설을 확인할 근거를 모으는 일이에요." },
    { term: "표본", en: "Sample", def: "전체를 대신해 조사하는 일부예요." },
    { term: "결론", en: "Conclusion", def: "자료 해석을 바탕으로 내리는 최종 판단이에요." },
  ],
};
