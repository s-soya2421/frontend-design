import { useMemo, useState } from "react";
import HeroSection from "../organisms/HeroSection.jsx";
import SessionList from "../organisms/SessionList.jsx";
import SidePanel from "../organisms/SidePanel.jsx";
import DashboardLayout from "../templates/DashboardLayout.jsx";

const stats = [
  { label: "ワークショップ", value: "12", note: "3ステージで開催" },
  { label: "スタジオパス", value: "310", note: "先行受付は終了" },
  { label: "フィールドノート", value: "48", note: "毎日更新" },
];

const sessions = [
  {
    id: "s1",
    title: "大胆なプロダクト仮説のストーリーマップ",
    host: "二階堂 花",
    stage: "ファウンドリー",
    time: "09:30",
    level: "入門",
    avatarTone: "mint",
  },
  {
    id: "s2",
    title: "砂漠のカラーパレットとムード設計",
    host: "レイ・オマル",
    stage: "アウトポスト",
    time: "10:45",
    level: "基礎",
    avatarTone: "sunset",
  },
  {
    id: "s3",
    title: "触感プロトタイピングの高速ループ",
    host: "パテル レア",
    stage: "キャノピー",
    time: "12:15",
    level: "基礎",
    avatarTone: "sand",
  },
  {
    id: "s4",
    title: "創業者デックのナラティブ設計",
    host: "ショーン・ヒル",
    stage: "ファウンドリー",
    time: "14:00",
    level: "入門",
    avatarTone: "mint",
  },
  {
    id: "s5",
    title: "クリエイティブ運用のシステム思考",
    host: "コール ラヤ",
    stage: "アウトポスト",
    time: "15:30",
    level: "上級",
    avatarTone: "ink",
  },
  {
    id: "s6",
    title: "ライブ批評ウォールと総括",
    host: "リー・ジュン",
    stage: "キャノピー",
    time: "17:00",
    level: "上級",
    avatarTone: "sunset",
  },
];

const itinerary = [
  { time: "09:00", title: "チェックインとフィールドキット" },
  { time: "11:00", title: "メンターのローテーション" },
  { time: "13:00", title: "オープンスタジオ" },
  { time: "16:00", title: "クリティークサークル" },
];

const tools = [
  {
    title: "キャンバスカード",
    description: "テンプレートをダウンロードしてスプリント計画に活用。",
  },
  {
    title: "シグナルトラッカー",
    description: "アイデアの価値を見極める週間リズム。",
  },
  {
    title: "プロトタイプライブラリ",
    description: "モーションプリセットとレイアウトをすぐに取得。",
  },
];

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filteredSessions = useMemo(() => {
    if (!query.trim()) return sessions;
    const lowered = query.toLowerCase();
    return sessions.filter((session) => {
      return (
        session.title.toLowerCase().includes(lowered) ||
        session.host.toLowerCase().includes(lowered)
      );
    });
  }, [query]);

  return (
    <div className="page unit unit-page">
      <HeroSection stats={stats} />
      <DashboardLayout
        primary={
          <SessionList
            sessions={filteredSessions}
            totalCount={sessions.length}
            query={query}
            onQueryChange={(event) => setQuery(event.target.value)}
            onReset={() => setQuery("")}
          />
        }
        secondary={<SidePanel itinerary={itinerary} tools={tools} />}
      />
    </div>
  );
}
