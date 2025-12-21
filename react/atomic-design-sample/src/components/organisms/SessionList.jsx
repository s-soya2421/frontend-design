import SearchBar from "../molecules/SearchBar.jsx";
import SessionCard from "../molecules/SessionCard.jsx";

export default function SessionList({
  sessions,
  totalCount,
  query,
  onQueryChange,
  onReset,
}) {
  return (
    <section className="panel unit unit-organism">
      <div className="panel-header">
        <div>
          <h2>セッション一覧</h2>
          <p>タイトルまたは講師名で絞り込み、スケジュールに追加します。</p>
        </div>
        <div className="panel-count">
          <span>
            表示 {sessions.length} / {totalCount} 件
          </span>
        </div>
      </div>
      <SearchBar
        value={query}
        onChange={onQueryChange}
        onReset={onReset}
        resultsCount={sessions.length}
      />
      <div className="session-grid">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </section>
  );
}
