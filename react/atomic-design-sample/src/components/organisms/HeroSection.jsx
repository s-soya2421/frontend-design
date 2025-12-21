import Badge from "../atoms/Badge.jsx";
import Button from "../atoms/Button.jsx";
import StatCard from "../molecules/StatCard.jsx";

export default function HeroSection({ stats }) {
  return (
    <section className="hero unit unit-organism">
      <div className="hero-copy">
        <Badge tone="sunset">アトミックUIキット</Badge>
        <h1>Atlas Studio セッション</h1>
        <p>
          原子・分子・有機体・テンプレートの階層で組み立てるサンプル。
          数分で大胆なスケジュールを作り、デバイス横断でシャープに保ちます。
        </p>
        <div className="hero-actions">
          <Button variant="primary">席を予約する</Button>
          <Button variant="ghost">トラックマップを見る</Button>
        </div>
      </div>
      <div className="hero-panel">
        <div className="hero-panel-header">
          <span>本日</span>
          <Badge tone="mint">2日目</Badge>
        </div>
        <p className="hero-panel-title">デザート・キャンバス・ラボ</p>
        <p className="hero-panel-note">
          メンターが交替する集中スタジオとライブ批評ウォール。
        </p>
        <div className="hero-panel-actions">
          <Button variant="accent" size="sm">
            ラボに参加
          </Button>
          <Button variant="ghost" size="sm">
            ノートを確認
          </Button>
        </div>
      </div>
      <div className="hero-stats">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
