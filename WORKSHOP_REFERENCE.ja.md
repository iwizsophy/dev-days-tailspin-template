# ワークショップ演習 日本語リファレンスガイド

> [!NOTE]
> **本ガイドの位置づけと目的**  
> 本リポジトリ内の課題 Issue 原稿（`.github/bootstrap-issues/`）や Copilot 指示書（`.github/instructions/`）、カスタムエージェント・スキルは、**LLM（GitHub Copilot や各種エージェント）に正確に指示を解釈させ、生成されるコードやテストの再現性を保つために英語原文のまま**管理されています。  
> 本ドキュメントは、ワークショップ参加者の皆様が「**各課題や指示書が何を意図し、どのような受け入れ要件を求めているか**」を日本語でスムーズに把握できるリファレンスとして用意されています。

---

## 📑 目次

1. [演習課題（Issue 01〜08）の日本語解説](#-演習課題issue-0108の日本語解説)
   - [Issue 01: タイトル検索機能の追加](#issue-01-タイトル検索機能の追加-01-search-gamesmd)
   - [Issue 02: ゲーム一覧の並び替え機能](#issue-02-ゲーム一覧の並び替え機能-02-sort-gamesmd)
   - [Issue 03: ゲーム詳細画面への説明文表示](#issue-03-ゲーム詳細画面への説明文表示-03-detail-descriptionsmd)
   - [Issue 04: パブリッシャー別ページの新設](#issue-04-パブリッシャー別ページの新設-04-publisher-pagesmd)
   - [Issue 05: トップページへのカタログ要約表示](#issue-05-トップページへのカタログ要約表示-05-catalog-summarymd)
   - [Issue 06: ゲーム一覧のページネーション](#issue-06-ゲーム一覧のページネーション-06-paginationmd)
   - [Issue 07: カテゴリ・パブリッシャー絞り込みフィルター](#issue-07-カテゴリパブリッシャー絞り込みフィルター-07-filter-gamesmd)
   - [Issue 08: リポジトリのコーディング規約策定](#issue-08-リポジトリのコーディング規約策定-08-coding-standardsmd)
2. [Copilot 指示書（.github/instructions/）の解説](#-copilot-指示書githubinstructionsの解説)
3. [カスタムエージェント（.github/agents/）の解説](#-カスタムエージェントgithubagentsの解説)
4. [カスタムスキル・拡張（.github/skills/ 等）の解説](#-カスタムスキル拡張githubskills-等の解説)
5. [💡 演習を成功させるための Tips](#-演習を成功させるための-tips)

---

## 🎯 演習課題（Issue 01〜08）の日本語解説

各課題は独立して取り組めるよう設計されています。データレイヤー、UIコンポーネント、テストの整合性を意識して進めてください。

---

### Issue 01: タイトル検索機能の追加 (`01-search-games.md`)
* **原文**: [01-search-games.md](file:///.github/bootstrap-issues/01-search-games.md)
* **概要**: ゲーム一覧ページで、タイトルによるインクリメンタル検索・絞り込みを行う検索バーを追加します。
* **背景**: ユーザーが探しているゲームをカタログ全体からスクロールして探す手間を省くため。
* **主な受け入れ基準（Acceptance Criteria）**:
  - [ ] ゲーム一覧ページにタイトル検索用インプットを表示する。
  - [ ] 大文字・小文字を区別せずマッチし、入力または送信時に一覧が動的に更新される。
  - [ ] 検索結果が 0 件の場合に適切な空状態（Empty State）メッセージを表示する。
  - [ ] アクセシビリティ規約（ラベル付け、キーボード操作、フォーカスリング）に準拠し、テスト用の `data-testid` 属性を付与する。
  - [ ] データ層の検索ヘルパー関数の単体テスト（Vitest）、および検索動作の E2E テスト（Playwright）を作成する。

---

### Issue 02: ゲーム一覧の並び替え機能 (`02-sort-games.md`)
* **原文**: [02-sort-games.md](file:///.github/bootstrap-issues/02-sort-games.md)
* **概要**: ゲーム一覧の表示順を「タイトル順（昇順・降順）」や「星評価順（高評価順）」でソートできるドロップダウン等のUIを追加します。
* **背景**: 高評価ゲームをすぐ見たいユーザーや、アルファベット順で探したいユーザーの利便性を高めるため。
* **主な受け入れ基準（Acceptance Criteria）**:
  - [ ] タイトルで並び替えができる（A→Z、Z→A）。
  - [ ] 星評価（Star Rating）の高い順に並び替えができる。
  - [ ] 評価が未設定（null）のゲームについて、末尾に並べるなどの妥当なルールを定めて処理する。
  - [ ] UI にアクセシビリティ対応と `data-testid` 属性を付与する。
  - [ ] ソート関数の単体テストと、ブラウザ操作の E2E テストを作成する。

---

### Issue 03: ゲーム詳細画面への説明文表示 (`03-detail-descriptions.md`)
* **原文**: [03-detail-descriptions.md](file:///.github/bootstrap-issues/03-detail-descriptions.md)
* **概要**: ゲーム詳細ページに、既存DB内に眠っている「カテゴリ説明」と「パブリッシャー説明」を表示します。
* **背景**: DB（categories/publishers テーブル）には `description` カラムが存在するものの、現状の詳細画面では名前しか表示されていません。スキーマ変更なしでコンテキストを充実させます。
* **主な受け入れ基準（Acceptance Criteria）**:
  - [ ] ゲーム詳細画面で、カテゴリの説明文が存在する場合に表示する。
  - [ ] パブリッシャーの説明文が存在する場合に表示する。
  - [ ] 説明文が未設定（null/空）の場合は空枠を表示せず、該当セクションを非表示にする。
  - [ ] スタイル規約・アクセシビリティ規約を満たし、`data-testid` を付与する。
  - [ ] DB取得関数を更新して説明文を含め、単体テスト・E2E テストでレンダリングを検証する。

---

### Issue 04: パブリッシャー別ページの新設 (`04-publisher-pages.md`)
* **原文**: [04-publisher-pages.md](file:///.github/bootstrap-issues/04-publisher-pages.md)
* **概要**: パブリッシャーごとの専用静的ページ（`/publisher/[id]` 等）を新設し、そのパブリッシャーが開発したゲーム一覧を表示します。
* **背景**: お気に入りの開発元（パブリッシャー）の他の作品を探しやすくするため。
* **主な受け入れ基準（Acceptance Criteria）**:
  - [ ] 各パブリッシャーの事前レンダリング静的ページを作成する（Astro の `getStaticPaths()` と `export const prerender = true` を使用）。
  - [ ] パブリッシャー名と説明文を表示し、既存の `GameCard` コンポーネントを再利用してゲーム一覧を表示する。
  - [ ] ゲームカードや詳細ページ内のパブリッシャー名から、この新設ページへのリンクを貼る。
  - [ ] アクセシビリティ・スタイル規約に準拠し、`data-testid` を付与する。
  - [ ] パブリッシャー別ゲーム取得ヘルパーと単体テスト、ページ表示の E2E テストを作成する。

---

### Issue 05: トップページへのカタログ要約表示 (`05-catalog-summary.md`)
* **原文**: [05-catalog-summary.md](file:///.github/bootstrap-issues/05-catalog-summary.md)
* **概要**: ホーム画面のファーストビューに、総ゲーム数や平均評価などのサマリー情報を表示するバナーを追加します。
* **背景**: 訪問者がサイト規模やゲームの品質を一目で把握できるようにし、活気のあるサイトにするため。
* **主な受け入れ基準（Acceptance Criteria）**:
  - [ ] カタログ内の総ゲーム数を表示する。
  - [ ] 評価が存在するゲームの平均星評価（Average Rating）を計算して表示する。
  - [ ] ゲームが 0 件の場合や評価付きゲームがない場合のエッジケースを考慮する。
  - [ ] スタイル・アクセシビリティ規約を満たし、`data-testid` を付与する。
  - [ ] 計算を行う純粋関数/ヘルパー関数の単体テスト、およびホーム画面へのレンダリング検証 E2E テストを作成する。

---

### Issue 06: ゲーム一覧のページネーション (`06-pagination.md`)
* **原文**: [06-pagination.md](file:///.github/bootstrap-issues/06-pagination.md)
* **概要**: ゲーム一覧ページにページネーション（1ページあたりの件数制限とページ移動UI）を実装します。
* **背景**: ゲーム数が増加した際に、全件を1ページに読み込むことによるパフォーマンス低下を防ぐため。
* **主な受け入れ基準（Acceptance Criteria）**:
  - [ ] `src/lib/` のデータ取得関数でページネーション（page/limit 指定など）をサポートする。
  - [ ] ゲーム一覧ページに前へ/次へ、またはページ番号のナビゲーションUIを追加する。
  - [ ] キーボード操作・アクセシビリティ規約を満たし、`data-testid` を付与する。
  - [ ] ページネーション計算ヘルパーの単体テスト（Vitest）と画面遷移の E2E テスト（Playwright）を作成する。

---

### Issue 07: カテゴリ・パブリッシャー絞り込みフィルター (`07-filter-games.md`)
* **原文**: [07-filter-games.md](file:///.github/bootstrap-issues/07-filter-games.md)
* **概要**: ゲーム一覧ページで、「カテゴリ」や「パブリッシャー」によるチェックボックス/セレクト絞り込みを可能にします。
* **背景**: ユーザーが興味のあるジャンル（Action, RPG 等）や特定の開発元に絞って探索できるようにするため。
* **主な受け入れ基準（Acceptance Criteria）**:
  - [ ] 1つ以上のカテゴリでゲームを絞り込める。
  - [ ] パブリッシャーでゲームを絞り込める。
  - [ ] カテゴリとパブリッシャーのフィルターを組み合わせて併用できる。
  - [ ] データ取得関数で複合フィルター条件をサポートする。
  - [ ] ARIA属性・フォーカスリング等のアクセシビリティ対応を行い、`data-testid` を付与する。
  - [ ] フィルター関数の単体テストと E2E テストを作成する。

---

### Issue 08: リポジトリのコーディング規約策定 (`08-coding-standards.md`)
* **原文**: [08-coding-standards.md](file:///.github/bootstrap-issues/08-coding-standards.md)
* **概要**: コードベース全体のコメント方針やドキュメント基準を統一し、ルールをドキュメント化・リント化します。
* **背景**: 自明なコードのオウム返しコメントをなくし、「なぜその実装なのか（意図・判断理由）」を記録する文化を作るため。
* **主な方針・受け入れ基準**:
  - [ ] **動作ではなく意図を書く**: コードをなぞるだけのコメントは削除し、背景や設計判断（Why）を書く。
  - [ ] **データ層の TSDoc/JSDoc**: `db/` や `src/lib/` の全 export 関数に目的・引数・戻り値の説明を記載する。
  - [ ] **Astro コンポーネントの Props 定義**: 再利用可能なコンポーネントの `Props` に説明を付与する。
  - [ ] `.github/instructions` への反映、ESLint ルールでの強制、README からのリンクを行う。

---

## 🤖 Copilot 指示書（.github/instructions/）の解説

GitHub Copilot がコード生成を行う際に自動参照されるプロンプト指示ファイル群です。

| 指示書ファイル | 対象ファイル (`applyTo`) | 指示の要点・重要なルール |
| :--- | :--- | :--- |
| **[copilot-instructions.md](file:///.github/copilot-instructions.md)** | プロジェクト全体 | **全体共通原則**。<br>・作業前にプロジェクトを探索する。<br>・長時間の作業には Todo リストを作成する。<br>・勝手に `main` ブランチへ自動 commit/push しない。<br>・テストは必ず `quality-checks` スキル経由で実行する。 |
| **[astro.instructions.md](file:///.github/instructions/astro.instructions.md)** | `**/*.astro` | **Astro コンポーネント指針**。<br>・完全静的事前レンダリング（`output: 'static'`）。<br>・データ取得は frontmatter 内で直接行う（APIサーバー不要）。<br>・クライアントサイド JS は最小限の `<script>` に留める。 |
| **[drizzle.instructions.md](file:///.github/instructions/drizzle.instructions.md)** | `db/**/*.ts`, `src/lib/*.ts` | **DB・データ層指針**。<br>・Drizzle ORM + Node built-in SQLite（`tailspin.db`）。<br>・`db/transforms.ts` は副作用のない純粋関数として保つ（テスト容易性）。<br>・データアクセス関数はテスト用に `db` 引数を注入可能（injectable）にする。 |
| **[style.instructions.md](file:///.github/instructions/style.instructions.md)** | `**/*.{astro,css}` | **スタイリング指針**。<br>・Tailwind CSS v4（Vite プラグイン経由）。<br>・**ダークテーマ必須**: 背景色には `bg-slate-800`〜`950`、テキストには `text-slate-100`〜`300` を使用する。 |
| **[ui.instructions.md](file:///.github/instructions/ui.instructions.md)** | UI全般 | **UI開発の戦略**。<br>・すべての対話型要素（ボタン、入力欄、リンク等）に `data-testid` 属性を付与する。<br>・セマンティックな HTML を優先し、適切な ARIA ロールを付与する。 |
| **[unit-tests.instructions.md](file:///.github/instructions/unit-tests.instructions.md)** | `**/*.test.ts` | **単体テスト指針（Vitest）**。<br>・テストは対象ファイルと同じ場所に配置（コロケーション）。<br>・テスト実行時はインメモリ SQLite を使用し、Astro サーバーを起動しない。 |
| **[playwright.instructions.md](file:///.github/instructions/playwright.instructions.md)** | `**/*.spec.ts` | **E2E テスト指針（Playwright）**。<br>・`getByRole` や `getByLabel` などのユーザー視点ロケーターを優先。<br>・固定時間待機（`waitForTimeout`）は禁止。自動待機アサーションを使う。 |

---

## 🕵️‍♂️ カスタムエージェント（.github/agents/）の解説

GitHub Copilot Chat で呼び出せる専用エージェントの定義です。

1. **Accessibility Agent (`accessibility.md`)**  
   * **役割**: WCAG 2.1 AA レベルに準拠したアクセシビリティ検証・修正を行います。
   * **ポイント**: 外部ライブラリを安易に追加せず、Astro とネイティブ HTML セマンティクスを活かした修正を提案します。
2. **PR Readiness Agent (`pr-readiness.md`)**  
   * **役割**: プルリクエスト作成前の総合品質ゲート（門番）。
   * **機能**: 受け入れ基準の充足確認、テストカバレッジの監査、全テスト実行、Playwright MCP によるブラウザ実機検証を行い、「Go / No-Go」を判定します。
3. **SEO Agent (`seo-agent.md`)**  
   * **役割**: 検索エンジン最適化（SEO）の監査とメタタグ改善を行います。
   * **ポイント**: `<head>` 内のメタ記述、canonical URL、Open Graph（OGP）タグ、JSON-LD 構造化データの実装を担当します。

---

## ⚡ カスタムスキル・拡張（.github/skills/ 等）の解説

1. **`quality-checks` スキル (`.github/skills/quality-checks/SKILL.md`)**  
   * `/quality-checks` コマンドで呼び出せます。
   * テスト（単体・E2E）、リンター、型検査を一括または適切に対処するための実行・トラブルシューティング手順書です。
2. **`make-contribution` スキル (`.github/skills/make-contribution/SKILL.md`)**  
   * ブランチ作成、コミット、PR 作成時にリポジトリ固有の作法（テストパス確認など）を守らせるためのガイドです。
3. **Database Explorer Canvas (`.github/extensions/database-explorer/`)**  
   * Copilot の Canvas 画面上でローカル SQLite のテーブル閲覧や SELECT クエリ実行ができる開発補助ツールです。

---

## 💡 演習を成功させるための Tips

1. **Issue の原文タイトルや受け入れ基準を活用する**  
   Copilot Chat に指示を出す際は、日本語で話しかけつつ、**Issue の英語タイトルや英語の Acceptance Criteria（箇条書き部分）をそのまま引用して渡す**と、Copilot がコードベースの命名規則と正確に一致させて実装してくれます。
   > **プロンプト例**:  
   > 「Issue 01 のタイトル検索機能を実装したいです。以下の要件を満たすコードを `src/lib/games.ts` と `src/pages/index.astro` に提案してください：  
   > - The game list page includes a search input that filters games by title  
   > - Matching is case-insensitive  
   > - includes a `data-testid` attribute」

2. **テストを必ず書いて品質チェックを通す**  
   実装後は、`npm run test:unit` や `npm run test:e2e` で動作を確認してください。

3. **Copilot のカスタムエージェントを活用する**  
   PR を出す前に `@pr-readiness` を呼び出してセルフレビューを行わせると、見落としがちなエッジケースやテスト漏れを指摘してもらえます。
