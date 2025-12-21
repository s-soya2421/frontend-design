import Avatar from "../atoms/Avatar.jsx";
import Badge from "../atoms/Badge.jsx";
import Button from "../atoms/Button.jsx";

const toneByLevel = {
  入門: "mint",
  基礎: "sunset",
  上級: "ink",
};

export default function SessionCard({ session }) {
  const tone = toneByLevel[session.level] || "sand";

  return (
    <article className="session-card unit unit-molecule">
      <div className="session-top">
        <Badge tone={tone}>{session.level}</Badge>
        <span className="session-time">{session.time}</span>
      </div>
      <h3>{session.title}</h3>
      <div className="session-meta">
        <div className="session-host">
          <Avatar name={session.host} tone={session.avatarTone} />
          <div>
            <p>{session.host}</p>
            <span>{session.stage}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          席を確保
        </Button>
      </div>
    </article>
  );
}
