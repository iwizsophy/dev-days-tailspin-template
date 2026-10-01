# ワークショップ配布版仕様書 (v2026.09.13.1)

本リポジトリは、ハンズオンイベント **Dev Days** 向けに最適化された Web アプリケーション（Tailspin Toys）の演習開始用テンプレートです。

---

## 📌 基本情報・出典

| 項目 | 内容 |
| :--- | :--- |
| **配布バージョン** | `v2026.09.13.1` |
| **対応教材** | [iwizsophy/dev-days-jp](https://github.com/iwizsophy/dev-days-jp)（Issue #2 / PR #3 の App 演習手順） |
| **配布管理リポジトリ** | [iwizsophy/dev-days-tailspin-template](https://github.com/iwizsophy/dev-days-tailspin-template) |
| **原作リポジトリ** | [github-samples/tailspin-toys](https://github.com/github-samples/tailspin-toys) |
| **取得元コミット** | `bae003609c8cff0c51d92658b8d3bd89450464f1` (スナップショット取り込み) |
| **ライセンス** | MIT License (Copyright GitHub, Inc.) |
| **日本語解説ガイド** | 📖 **[WORKSHOP_REFERENCE.ja.md](WORKSHOP_REFERENCE.ja.md)**（演習課題や Copilot 指示書の詳細解説） |

> [!NOTE]
> **コードの整合性について**  
> アプリケーション本体（`src/`）、ゲームデータ（`db/`）、既存テスト、課題 Issue の原稿はすべて**出典（英語）と同一**です。演習の解答コードや個人環境固有のローカルパスは含まれていません。  
> 課題や指示書の日本語解説は **[WORKSHOP_REFERENCE.ja.md](WORKSHOP_REFERENCE.ja.md)** をご覧ください。

---

## 🛠️ 適用済みの修正内容（初期セットアップ）

演習開始時の環境不整合やエラーを防ぐため、以下の設定調整があらかじめ適用されています（参加者による手動パッチは不要です）。

1. **エージェント定義の修正**  
   `.github/agents/pr-readiness.md` 内の `tools` 定義における不正な YAML エスケープを修正。
2. **MCP 設定の正規化**  
   `.mcp.json` のルートキーを旧仕様の `servers` から `mcpServers` へ更新（接続先設定は保持）。
3. **Node.js バージョンの統一**  
   `.nvmrc` で **Node 24.19.0** を指定。`package.json` およびロックファイルの動作条件を揃え、CI や Copilot Setup Steps でも参照。
4. **教材メタデータ・各種ドキュメントの追加**  
   本仕様書（`WORKSHOP.md`）、出典記録（`workshop-source.json`）、日本語解説（`WORKSHOP_REFERENCE.ja.md`）を追加。
5. **依存パッケージと CI 環境の更新**  
   Astro（7.3.2）、Vitest（4.1.11）、Playwright（1.63.0）等の依存関係を更新し、CI 実行環境（コンテナイメージ）と整合。
6. **サーバー起動プロセスの安定化**  
   `dev` / `preview` を Astro の公開 API 経由で起動するよう改善。エージェント環境（App Run 等）と Playwright が同一プロセスの生存期間を安定して管理できるように修正。

---

## 🚀 使い方と確認手順

### 1. 参加者の事前準備（テンプレートのコピー）
* 本リポジトリ右上の **[Use this template]** → **[Create a new repository]** から各自のアカウントへコピーを作成します。
* **重要**: **「Include all branches」のチェックは OFF** にしてください。
* コピー完了後、GitHub Actions で自動ワークフロー **Bootstrap template issues** が走り、8件の演習用課題（Issue）が生成されることを確認します。  
  *(※自動起動しなかった場合は、リポジトリの [Actions] タブから手動実行してください)*

### 2. ローカル動作確認（推奨環境: Node.js 24.19.0）
ローカル環境または Codespaces にて、以下のコマンドで動作確認を行います。

```bash
# 1. 依存関係のインストール
npm ci

# 2. 静的解析（コードスタイル・型検査）
npm run lint
npm run typecheck:all

# 3. 単体テストの実行（Vitest）
npm run test:unit

# 4. E2Eテストの実行（ビルド・DB初期化・プレビューが自動で連動）
npm run test:e2e

# ※ Chromium ブラウザが未導入の場合のみ実行
npm run test:e2e:install
```

### 3. 演習時の留意点
* **MCP / App 権限の承認**: MCP サーバーの接続やツール実行の信頼確認ダイアログが表示された際は、内容を確認のうえ各自で承認してください。
* **トラブル時の対応**: 動作停止時の対処法や実走範囲の詳細については、教材リポジトリの `content/ja/material/verification.md` を参照してください。
* **Dev Container**: 出典元の設定ファイルを保持していますが、本配布版での起動は未検証です。
* **MCP 外部接続**: 外部連携サービスおよび `@playwright/mcp@latest` は事前接続確認を行ってください。

---

## 🔍 配布版の検査状況 (2026年9月13日時点)

| 検査項目 | 結果 | 備考 |
| :--- | :---: | :--- |
| **単体テスト (Vitest)** | ✅ 合格 | 27件のテストすべてパス（Windows / Node 24.19.0） |
| **E2E テスト (Playwright)** | ✅ 合格 | Chromium による21件のテストすべてパス（ビルド・DB初期化含む） |
| **Lint / 型検査** | ✅ 合格 | `npm run lint`, `npm run typecheck:all` 共にエラーゼロ |
| **設定構文チェック** | ✅ 合格 | YAML構文、MCPキー設定を検証済み |
| **出典との整合性** | ✅ 一致 | `src/`・`db/`・`e2e-tests/`・Issue原稿のバイト比較一致を確認 |
| **サーバー起動・解放** | ✅ 正常 | `npm run dev` でローカルURL表示、HTTP 200応答、停止後のポート解放を確認 |
| **セキュリティ監査 (`npm audit`)** | ⚠️ 要確認 | **Critical 0 / High 0 / Moderate 4 / Low 0**<br>※残る4件は `drizzle-kit` 経由の `esbuild` 関連（GHSA-67mh-4wv8-2f99）。互換性を壊すダウングレードを避けるため意図して保留中。 |

---

## main の依存関係更新（2026年10月2日）

2026年9月13日の配布版に対して、main では Astro のパッチ更新と、公開済みの脆弱性に対する以下の修正を適用しました。依存関係の変更は `package.json` とロックファイルに限定し、演習開始時のアプリケーション、ゲームデータ、テスト、課題原稿を維持しています。

| パッケージ | 更新前 | 更新後 | ライセンス |
| :--- | :--- | :--- | :--- |
| Astro | 7.3.2 | 7.3.3 | MIT |
| brace-expansion | 5.0.9 | 5.0.12 | MIT |
| devalue | 5.8.1 | 5.9.4 | MIT |
| fast-uri | 3.1.7 | 3.1.8 | BSD-3-Clause |
| `@esbuild-kit/core-utils` 配下の esbuild | 0.18.20 | 0.25.12 | MIT |

Astro の更新には開発時の不具合修正が含まれます。詳しくは [Astro 7.3.3 のリリースノート](https://github.com/withastro/astro/releases/tag/astro%407.3.3)を参照してください。これに伴う内部依存の `find-proc` 0.2.0 と `verkit` 0.4.1 もロックファイルへ反映しています。いずれも MIT ライセンスです。

Drizzle Kit 0.31.10 は維持し、`package.json` の `overrides` で `@esbuild-kit/core-utils` が使う esbuild だけを `^0.25.12` に指定しています。これは [GHSA-67mh-4wv8-2f99](https://github.com/evanw/esbuild/security/advisories/GHSA-67mh-4wv8-2f99) に該当する古い esbuild を、Drizzle Kit のダウングレードを避けて差し替えるためです。上流の依存更新でこの経路から古い esbuild が入らなくなったら override を削除し、クリーンインストール、監査、スキーマ生成を再確認してください。

brace-expansion、devalue、fast-uri は既存の依存範囲内で修正版へ更新しています。Vitest は 4.1.11 を維持しています。

Node.js 24.19.0 / Windows で以下を確認しました。

| 検査項目 | 結果 |
| :--- | :--- |
| クリーンインストール (`npm ci`) | 成功 |
| セキュリティ監査 (`npm audit`) | Critical 0 / High 0 / Moderate 0 / Low 0 / Info 0 |
| Lint / 型検査 | エラー・警告なし |
| 単体テスト | 27件すべて成功 |
| 静的ビルド・E2E テスト | Chromium による21件すべて成功（DB初期化・ビルド含む） |
| Drizzle Kit のスキーマ生成 | 成功。スキーマ差分なし |
| esbuild の互換性 | 差し替え先で同期・非同期の TypeScript 変換とソースマップを確認 |
| Playwright MCP による手動確認 | 一覧 → ゲーム詳細 → 一覧の遷移と表示を確認。コンソールエラー0件 |

## 🔄 今後の更新方針

* 既存のタグ（`v2026.09.13.1` 等）の付け替えは行いません。
* 上流リポジトリの更新が必要な場合は、演習初期状態を保ったまま新しいタグを作成して再検証します。
* 上流（`github-samples/tailspin-toys`）への直接の push や Pull Request は行いません。


