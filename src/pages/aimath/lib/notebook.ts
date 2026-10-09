// 오답노트 — localStorage 저장 · 불러오기 도우미 (클라이언트 전용)

export type NotebookEntry = {
  id: string;
  unitId: string;
  unitTitle: string;
  problemTitle: string;
  myAnswer: string;
  correctAnswer: string;
  savedAt: string; // ISO 문자열
};

export type NewNotebookEntry = Omit<NotebookEntry, "id" | "savedAt">;

const STORAGE_KEY = "penedu-aimath-notebook";

function isNotebookEntry(value: unknown): value is NotebookEntry {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.unitId === "string" &&
    typeof v.unitTitle === "string" &&
    typeof v.problemTitle === "string" &&
    typeof v.myAnswer === "string" &&
    typeof v.correctAnswer === "string" &&
    typeof v.savedAt === "string"
  );
}

export function loadNotebook(): NotebookEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isNotebookEntry);
  } catch (err) {
    console.error("오답노트를 불러오지 못했어요.", err);
    return [];
  }
}

export function saveNotebook(entries: NotebookEntry[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (err) {
    console.error("오답노트를 저장하지 못했어요.", err);
  }
}

function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function addNotebookEntry(input: NewNotebookEntry): NotebookEntry {
  const entry: NotebookEntry = {
    ...input,
    id: makeId(),
    savedAt: new Date().toISOString(),
  };
  saveNotebook([entry, ...loadNotebook()]);
  return entry;
}

// 같은 단원 · 같은 문제 · 같은 내 답이 이미 있으면 겹쳐 기록하지 않아요.
export function findNotebookDuplicate(
  input: NewNotebookEntry,
): NotebookEntry | undefined {
  return loadNotebook().find(
    (e) =>
      e.unitId === input.unitId &&
      e.problemTitle === input.problemTitle &&
      e.myAnswer === input.myAnswer,
  );
}

export function removeNotebookEntry(id: string): void {
  saveNotebook(loadNotebook().filter((e) => e.id !== id));
}

export function clearNotebook(): void {
  saveNotebook([]);
}

export function formatSavedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
