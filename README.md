# これは何？
このリポジトリをcloneするとReactプロジェクトの雛形を簡単に生成できます。<br>
create-react-appと違うのは、最小限の構成になっているため余計なファイルを含んでいないという点です。<br>
以下の技術を使用しています。
* React.js
* TypeScript
* Vite

# 動作要件
* Node.js version 12.0.0以上
* npm version 7以上

# 使い方
導入
```sh
git clone https://github.com/kde15/react-template.git
cd react-template
npm install
```

実行
```sh
npm run dev
```
デフォルト設定なら[http://localhost:3333/](http://localhost:3333/)で動作します

ビルド
```sh
npm run build
```

# cloneせずに手動で構築する場合
```sh
npm init -y
npm install --save react react-dom
npm install --save-dev typescript vite @vitejs/plugin-react eslint eslint-config-prettier eslint-plugin-react prettier
npm install --save-dev @types/node @types/react @types/react-dom @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

# 【参考】よく使うパッケージの導入
AWS Amplify
```sh
# Amplify
npm install aws-amplify@4.2.8
```

Material UI
```sh
# MUI
npm install @mui/material @emotion/react @emotion/styled
# アイコン
npm install @mui/icons-material
```

# 【参考】環境変数の使用方法
## 本リポジトリの仕様
本リポジトリはローカルで動作させる場合は`.env`ファイルから環境変数を読み込み、クラウド上で動作させる場合は環境変数から値を読むようにしている<br>
デフォルトではmodeがdevelopmentの場合のみlocalで動作するものと判断し、それ以外のmodeはクラウド上で動作するものとしている<br>
これを変更するには`src/util/env.ts`の`isLocal()`関数の実装を修正するか、`.env`ファイルに`VITE_IS_LOCAL`プロパティをbooleanで定義する<br>
設定は`VITE_IS_LOCAL`の値が最優先され、modeがdevelopment以外でも`VITE_IS_LOCAL`がtrueならローカルで動作しているとみなし、`.env`ファイルから値を読み込む<br>
逆にmodeがdevelopmentでも`VITE_IS_LOCAL`がfalseならクラウドで動作しているとみなし、環境変数から値を読み込む

## .envファイルを使う方法
modeがdevelopmentの場合なら、プロジェクトルートに`.env.development.local`を作成して以下のように環境変数を記載する
```sh
VITE_APP_TITLE=xxxxxxxxxxxx
VITE_IS_LOCAL=true
```

* プロパティはprefixに`VITE_`を付与しなければ読み込まれない(Viteの仕様)
* ファイル名の末尾に`.local`を付与するとデフォルトでgitignore対象となる
* mode(`.development`の部分)を付与せず`.env`または`.env.local`という命名でファイルを作成すると、そのenvファイルはどのmodeの場合でも読み込まれる
* modeは実行時に`vite --mode development`のように指定する、本リポジトリでは`package.json`のscriptsでmodeを指定している

**.envファイルの使用例**
例えば本番環境ビルドをする場合なら`.env.production`ファイルに環境変数を記載し、`package.json`のscriptsに以下のように記載する
```json
{
    "scripts": {
        "prod": "vite build --mode production"
    }
}
```

`.env`ファイルに記載された値は`src/vite-env.d.ts`または`src/env.d.ts`に型を定義する
```ts
/// <reference types="vite/client" />

// .envファイル用の型定義
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_IS_LOCAL: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
```

コード上からは以下のようにして値を取得できる
```ts
// VITE_API_KEYの値を取得
const key = import.meta.env.VITE_API_KEY;
```

本リポジトリでは`src/util/env.ts`に値を取得する処理を実装している

## 実行環境の環境変数を取得する方法
Amplifyなどのクラウド環境にホスティングする場合、`.env`ファイルではなく環境変数から値を取得したい場合がある<br>
Viteはコード上で環境変数を読めない仕様になっているので、本リポジトリでは以下のようにして読み込むようにしている
* `vite.config.ts`では`process.env`から環境変数を読み込めるので、そこで必要な環境変数のみを読み込んでcloudEnvというglobal定数に格納する
* `src/util/env.ts`で値を取得する際、クラウド上で実行する環境(本リポジトリではmodeが`development`以外の場合としている)の場合はこのcloudEnv定数から値を取得する

例としてクラウド環境に設定されている`API_KEY`という環境変数を読み込むための手順を以下に示す<br>
まず`vite.config.ts`のdefineにcloudEnv定数を定義し、`API_KEY`プロパティを設定する
```ts
export default defineConfig({
    define: {
        // process.envから環境変数を取得できる
        cloudEnv: JSON.stringify({ API_KEY: process.env.API_KEY }),
    },
});
```

次に`src/vite-env.d.ts`に環境変数の型を定義する
```ts
/// <reference types="vite/client" />

// クラウド環境用グローバル定数の型定義
interface CloudEnv {
    API_KEY: string;
}

declare const cloudEnv: CloudEnv;
```

最後に`src/util/env.ts`でグローバル定数cloudEnvから値を取得するようにする(ローカルの場合は`.env`ファイルを使用したいので、ローカルではない場合のみグローバル定数から取得する)
```ts
const env = {
    // 追加
    API_KEY: isLocal() ? import.meta.env.VITE_API_KEY : cloudEnv.API_KEY,
};

export default env;
```

また他の方法として本番環境のCI時に`.env.production`を生成するなどの方法も考えられるが、そのためのscriptを書くのとそれのメンテナンスが面倒なので採用しなかった

# 備忘メモ
* 本リポジトリは雛形なので`package-lock.json`は含んでいない
* publicディレクトリにはrobots.txtなどを置く(これは[Viteの仕様](https://ja.vitejs.dev/guide/assets.html#public-%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA))
