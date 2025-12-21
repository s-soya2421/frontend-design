import Badge from "../atoms/Badge.jsx";
import Button from "../atoms/Button.jsx";

export default function SidePanel({ itinerary, tools }) {
  return (
    <aside className="panel panel--side unit unit-organism">
      <div className="side-block">
        <div className="side-header">
          <h2>フィールドノート</h2>
          <Badge tone="mint">ライブ</Badge>
        </div>
        <p>
          セッション選びを整えるフィールドノート。各ブロックに要約と共有プロンプトを
          用意しています。
        </p>
      </div>

      <div className="side-block">
        <h3>スタジオ予定</h3>
        <ul className="timeline">
          {itinerary.map((item) => (
            <li key={item.time}>
              <span>{item.time}</span>
              <strong>{item.title}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="side-block">
        <h3>ツールキット</h3>
        <div className="tool-grid">
          {tools.map((tool) => (
            <article key={tool.title} className="tool-card">
              <h4>{tool.title}</h4>
              <p>{tool.description}</p>
            </article>
          ))}
        </div>
        <Button variant="primary" size="sm">
          キットをダウンロード
        </Button>
      </div>
    </aside>
  );
}
