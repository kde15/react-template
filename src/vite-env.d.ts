/// <reference types="vite/client" />

// .envファイル用の型定義
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_IS_LOCAL: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

// クラウド環境用グローバル定数の型定義
interface CloudEnv {
    APP_TITLE: string;
}

declare const cloudEnv: CloudEnv;
