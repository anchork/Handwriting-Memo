# 手書きメモ (PWA)
[https://anchork.github.io/Handwriting-Memo/](https://anchork.github.io/Handwriting-Memo/)

鉛筆と消しゴムだけのシンプルな手書きメモ。無限キャンバス、バインダー、PDF保存に対応。

## GitHub Pages で公開する

1. このフォルダの中身をすべてリポジトリのルートに置いて push
2. リポジトリの Settings → Pages → Source を「Deploy from a branch」、Branch を `main` / `(root)` にして Save
3. 数分後に `https://<ユーザー名>.github.io/<リポジトリ名>/` で開けます

## インストール

- Android / PC の Chrome・Edge: アドレスバーのインストールボタン、またはメニューの「アプリをインストール」
- iPhone / iPad の Safari: 共有ボタン → 「ホーム画面に追加」

## 更新するとき

`index.html` などを変更したら、`sw.js` の `CACHE_VERSION` を上げてから push してください。
