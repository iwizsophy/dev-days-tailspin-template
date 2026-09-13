# 教材配布版 v2026.09.13.1

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
5. Astro（lockfile は 7.3.2）・開発依存・Vitest 4.1.11 と間接依存を更新。Playwright 1.63.0 と CI イメージを一致。
6. dev / preview を Astro の公開 API で起動し、エージェント環境でも App Run と Playwright が同じプロセスの寿命を管理できるよう修正。Playwright の起動設定も更新。

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
- エージェント環境でも npm run dev が Local URL を表示し、HTTP 200 を返すことと停止後のポート解放を確認。新しい起動コードでのネイティブ App Run / Stop の再操作は未実施。
- npm audit は **Critical 0・High 0・Moderate 4・Low 0**。残る4件は drizzle-kit → @esbuild-kit/esm-loader → @esbuild-kit/core-utils → esbuild の同じ依存経路（GHSA-67mh-4wv8-2f99）です。
  自動修正案は drizzle-kit 0.18.1 への互換性を壊すダウングレードなので適用していません。教材で通常使う migrate / seed は tsx 経由ですが、指摘の到達可能性を網羅的に評価したものではありません。
  配布前にこの残件を確認してください。「監査指摘ゼロ」とは扱いません。
- 旧タグ v2026.09.13 は当時の監査結果（Critical 1 を含む）とともに保持し、付け替えません。

## 更新する場合

この配布版のタグは付け替えません。上流の必要な差分を読み、演習開始状態を保って
新しい版で再検証します。教材の取得先・バージョンと出典情報を同時に更新します。
上流への push・PR は行いません。
