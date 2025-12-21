import Button from "../atoms/Button.jsx";
import Input from "../atoms/Input.jsx";

export default function SearchBar({ value, onChange, onReset, resultsCount }) {
  return (
    <div className="search-bar unit unit-molecule">
      <Input
        label="セッションを検索"
        labelHidden
        value={value}
        onChange={onChange}
        placeholder="セッション名や講師で検索"
      />
      <div className="search-actions">
        <span className="search-count">{resultsCount}件</span>
        <Button variant="ghost" size="sm" onClick={onReset} disabled={!value}>
          リセット
        </Button>
      </div>
    </div>
  );
}
