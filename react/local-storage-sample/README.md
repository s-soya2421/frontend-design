# Local Library CRUD

React + Vite で作成した、`localStorage` 永続化つきのシンプルな CRUD サンプルです。

## できること

- 本の登録（Title / Author / Status）
- 本の編集
- 本の削除
- キーワード検索（Title / Author）
- 読書ステータス集計（Total / Reading / Finished）
- 全件クリア

## セットアップ

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
npm run preview
```

## データ保存先

- ブラウザ `localStorage`
- キー: `library-crud-items-v1`

## 主な構成

```text
local-storage-sample/
  src/
    App.jsx
    index.css
    main.jsx
```
