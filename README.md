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

# 備忘メモ
* 本リポジトリは雛形なので`package-lock.json`は含んでいません
* publicディレクトリにはrobots.txtなどを置く(これは[Viteの仕様](https://ja.vitejs.dev/guide/assets.html#public-%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA))
