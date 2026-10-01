# Dev Days 日本語教材用 Tailspin Toys テンプレート

本リポジトリは、ハンズオン教材 [dev-days-jp](https://github.com/iwizsophy/dev-days-jp) の演習開始用テンプレートです。  
※元の [github-samples/tailspin-toys](https://github.com/github-samples/tailspin-toys) へ Pull Request などの変更を送り返す必要はありません。

---

### 📋 基本情報

| 項目 | 内容 |
| :--- | :--- |
| **対応教材** | [iwizsophy/dev-days-jp](https://github.com/iwizsophy/dev-days-jp) |
| **配布版バージョン** | `v2026.09.13.1`（修正履歴や検査状況は [WORKSHOP.md](WORKSHOP.md) を参照） |
| **推奨 Node.js** | **24.19.0**（`.nvmrc` 指定。CI も同一バージョン） |
| **日本語リファレンス** | 📖 **[演習課題・Copilot 指示書の日本語解説 (WORKSHOP_REFERENCE.ja.md)](WORKSHOP_REFERENCE.ja.md)** |

---

### 🚀 参加者向けスタート手順

1. **テンプレートからリポジトリを作成**  
   画面右上の **[Use this template]** → **[Create a new repository]** をクリックして、自分用のアカウント/環境にコピーを作成します。
2. **作成時の注意点**  
   **「Include all branches」は必ず Off（チェックなし）** にしてください。
3. **演習課題（Issue）の確認**  
   リポジトリ作成後、Actions で **Bootstrap template issues** が自動実行され、8件の演習用 Issue が作成されます。  
   *(※数分待っても作成されない場合は、GitHub の [Actions] タブから手動で実行してください)*
4. **課題や指示書の確認**  
   英語で書かれた課題（Issue 01〜08）や Copilot 指示書の内容は、**[WORKSHOP_REFERENCE.ja.md](WORKSHOP_REFERENCE.ja.md)** で分かりやすく日本語解説しています。

> [!NOTE]
> * **設定適用済み**: YAML や MCP 等の既知の初期設定・修正はあらかじめ適用されています（参加者による事前パッチ適用は不要です）。
> * **演習範囲**: 星評価の表示、カスタム指示の更新、フィルター機能、Canvas などの演習の完成コードは含まれていません（演習の中で実装します）。

---

> [!IMPORTANT]
> これ以降は出典元（英語）の README です。  
> 環境条件や教材の手順については、上記の日本語案内および [WORKSHOP.md](WORKSHOP.md) を優先してください。
> 各課題や指示書の日本語解説は [WORKSHOP_REFERENCE.ja.md](WORKSHOP_REFERENCE.ja.md) を参照してください。

---

# Tailspin Toys

Tailspin Toys is a crowdfunding platform for games with a developer theme. The project is a website for a fictional game crowd-funding company, built as a single [Astro](https://astro.build/) site (fully prerendered/static output) styled with [Tailwind CSS](https://tailwindcss.com/). Its data lives in a local SQLite database accessed through [Drizzle ORM](https://orm.drizzle.team/) and Node.js's built-in SQLite driver; pages query the database directly in frontmatter at build time, so there is no separate backend service.

## Architecture

- **Astro 7** — pages, layouts, components, and routing. `output: 'static'`, so the whole site is prerendered to HTML at build time.
- **Drizzle ORM + Node SQLite** — the data layer. The schema lives in `db/schema.ts`; data is seeded from `db/games.csv`. Migrations are managed with `drizzle-kit`.
- **Tailwind CSS v4** — styling via utility classes (dark theme).
- **Vitest** — unit tests for the data layer and pure transforms.
- **Playwright** — end-to-end tests run against the built static site.

The database is migrated and seeded automatically before `dev`/`build` (via the `predev`/`prebuild` npm scripts) and is written to the gitignored `tailspin.db` file.

## Using this template

This repository is a GitHub template. When you create a new repository from it, a one-time **Bootstrap template issues** workflow (`.github/workflows/bootstrap-issues.yml`) runs automatically on the first push to `main` and opens a set of starter issues describing suggested first features. Each issue is defined by a Markdown file in `.github/bootstrap-issues/` — the first heading becomes the issue title and the remaining content becomes the body — so you can edit, add, or remove files there to control which issues are created.

The workflow only runs on repositories created from the template (the `if: ${{ !github.event.repository.is_template }}` guard skips the template itself), and after creating the issues it removes itself and the `.github/bootstrap-issues/` folder in a cleanup commit so it never runs again.

## Getting started

Install dependencies once with Node.js 22.13 or later:

```bash
npm ci
npx playwright install chromium   # only needed to run the E2E tests
```

## Launch the site

```bash
npm run dev
```

`predev` migrates and seeds the local database first. Then navigate to the [website](http://localhost:4321) to see the site!

To preview a production build instead:

```bash
npm run build      # prebuild migrates + seeds, then builds the static site
npm run preview
```

## Database

The SQLite database is built from `db/games.csv` — there is no live data to migrate.

```bash
npm run db:generate   # generate a migration after editing db/schema.ts
npm run db:migrate    # apply migrations
npm run db:seed       # seed from games.csv (idempotent)
npm run db:setup      # migrate + seed (run automatically by predev/prebuild)
```

> [!NOTE]
> Seeding is idempotent — it skips games that already exist (matched by title) rather than reconciling changed rows. CI always starts from a clean database, so it reflects `games.csv` exactly. Locally, if you edit or remove rows in `games.csv`, delete `tailspin.db` and re-run `npm run db:setup` to fully regenerate.

## Running tests

```bash
npm run test:unit   # Vitest unit tests (transforms + data-access helpers)
npm run test:e2e    # Playwright E2E tests (builds + previews the static site first)
```

## Linting

The frontend uses ESLint to enforce code quality across TypeScript and Astro files. Run it with:

```bash
npm run lint
```

ESLint is also run automatically in CI on pull requests to `main`.

## Type checking

The project runs on **TypeScript 7** (the native Go compiler, `tsgo`) for type checking, adopted side-by-side via the [`@typescript/native-preview`](https://www.npmjs.com/package/@typescript/native-preview) package. The classic `typescript` package is intentionally kept at v6 so ESLint + `typescript-eslint` and `astro check` keep working unchanged — TypeScript 7's programmatic API isn't ready for those tools yet.

```bash
npm run typecheck        # tsgo (TS 7) type-checks the pure TypeScript (db/, src/lib/, src/types/, configs, tests)
npm run typecheck:astro  # astro sync + astro check type-check .astro files (on the classic TypeScript package)
npm run typecheck:all    # both of the above
```

`tsgo` runs against [`tsconfig.tsgo.json`](tsconfig.tsgo.json), a scoped config that excludes `.astro` files (which the native compiler doesn't understand). Type checking runs automatically in CI on pull requests to `main`.

> [!NOTE]
> The native compiler is used only for type checking (`--noEmit`); the site is still built by `astro build` (Vite/esbuild). The classic `typescript` package stays on v6 until `typescript-eslint` and `@astrojs/check` support the native API (~TS 7.1); a Dependabot `ignore` in `.github/dependabot.yml` holds the classic `typescript@7` bump until then.

## Copilot Agents & Skills

This project ships Copilot customizations to assist with quality assurance:

### Database Explorer Canvas

The shared **Database Explorer** canvas (`.github/extensions/database-explorer/`) provides a small UI and agent actions for browsing the project's SQLite tables and running one read-only `SELECT` or `WITH` query at a time. It uses the database at `.data/tailspin.db` (or `DATABASE_URL` when set), so run `npm run db:setup` before opening it in a fresh checkout.

### PR Readiness Agent

The **PR Readiness** agent (`.github/agents/pr-readiness.md`) is a pre-PR quality gate. Invoke it before opening a pull request to:

- Verify all acceptance criteria have been implemented
- Audit test coverage and fill any gaps
- Run the full verification suite (unit tests, lint, E2E tests)
- Manually validate the feature in the browser via Playwright MCP (required for every run)
- Produce a go/no-go report

### quality-checks Skill

The **quality-checks** skill (`.github/skills/quality-checks/SKILL.md`) wraps the project's npm test and lint commands with a detailed debugging and troubleshooting runbook. Use it via `/quality-checks` when:

- Running tests or lint for the first time after setup
- Diagnosing test failures (port conflicts, stale servers, flaky tests, CI divergence)
- Validating readiness before commits, pushes, or merges

### GitHub Copilot App Run Menu

The [GitHub Copilot app](https://github.com/github/github-app) reads
`.github/github-app.yml` to provide project commands in its **Run** menu.
New sessions automatically install dependencies; use **Run development site** to
start Astro. When Astro reports its local URL, the app opens it in the browser
canvas automatically. The menu also provides static build and type-check
commands for on-demand validation.

## License 

This project is licensed under the terms of the MIT open source license. Please refer to the [LICENSE](./LICENSE) for the full terms.

## Maintainers 

You can find the list of maintainers in [CODEOWNERS](./.github/CODEOWNERS).

## Support

This project is provided as-is, and may be updated over time. If you have questions, please open an issue.

## Disclaimer

This app is not intended for use in a production environment, nor is it built as an example of what a production app should look like.
