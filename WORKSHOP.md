# 教材配布版 v2026.09.13

## 出典

- 原作: https://github.com/github-samples/tailspin-toys
- 取得コミット: `bae003609c8cff0c51d92658b8d3bd89450464f1`
- 元のファイルをスナップショットとして取り込み、上流の履歴は merge していません。
- 元の LICENSE（MIT、Copyright GitHub, Inc.）をそのまま保持しています。
- 配布管理: https://github.com/iwizsophy/dev-days-tailspin-template
- 対応教材: https://github.com/iwizsophy/dev-days-jp （Issue #2 / PR #3 の App 手順）

## 適用済みの開始用修正

1. `.github/agents/pr-readiness.md`: tools の不正な YAML エスケープを修正。
2. `.mcp.json`: ルートキーを `servers` から `mcpServers` へ変更。既存の接続先を保持。
3. `.nvmrc`: Node 24.19.0 を指定。package.json / lockfile の最低条件を合わせ、CI と Copilot Setup Steps もこのファイルを参照。
4. 本 README・配布記録・機械可読の出典情報を追加。

アプリのソース、ゲームデータ、既存テスト、課題 Issue の原稿は出典と同一です。
演習で作成した完成コードや個人のローカルパスは含めません。

## 使い方と確認範囲

非公開テンプレートのため、参加者には事前に閲覧権限が必要です。
参加者は配布元の main を直接編集せず、テンプレートから自分用のコピーを作成します。
コピー先で初期 Issue 作成ワークフローの成功と8件の課題を確認してください。
テンプレート自身では `is_template` 条件によって初期 Issue 作成をスキップします。
GitHub 側の作成時イベントによっては、コピー先の Actions から手動実行が必要です。

Node 24.19.0 で `npm ci`、`npm run lint`、`npm run typecheck:all`、
`npm run test:unit`、`npm run test:e2e` を検査します。
E2E の webServer が build・DB 初期化・preview を実行します。
ブラウザー未導入の場合は `npm run test:e2e:install` で Chromium を導入します。

App の設定・MCP の信頼確認は本人が内容を確認して承認します。
設定の適用済みと、App の自動セットアップ成功は別です。停止時の対処と
App 1.1.20 の実走範囲は教材の `content/ja/material/verification.md` を参照してください。
dev container は出典の定義を保持していますが、この配布版では起動未検証です。
MCP の外部サービスと `@playwright/mcp@latest` は固定されていないため、開催前に接続を再確認します。

## 2026年9月13日の配布版検査

- Windows / Node 24.19.0: npm ci、単体27件、lint、型検査が成功。
- Chromium E2E 21件が成功。テスト内の build・DB 初期化・preview も成功。
- YAML の構文と MCP のルートキーを検査済み。
- 出典アーカイブとのバイト比較で src/・db/・e2e-tests/・8件の課題原稿に変更がないことを確認。
- **配布前の保留事項:** npm audit の詳細結果は40件（Critical 1、High 24、Moderate 14、Low 1）。
  インストール時の要約は16件でしたが、ここでは詳細監査結果を記録しています。
  Astro の AVIF 最適化に関する [GHSA-26w7-cxv4-gfx2](https://github.com/advisories/GHSA-26w7-cxv4-gfx2) などを含みます。
  個別の到達可能性・影響範囲は未判定です。このタグを「脆弱性対応済み」と扱わず、
  依存更新と再検証を行った版を参加者への本番配布前に用意してください。

## 更新する場合

この配布版のタグは付け替えません。上流の必要な差分を読み、演習開始状態を保って
新しい版で再検証します。教材の取得先・バージョンと出典情報を同時に更新します。
上流への push・PR は行いません。
