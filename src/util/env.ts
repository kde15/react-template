const isLocal = () => {
    // envファイルにVITE_IS_LOCALがtrueとして定義されていればローカル環境とみなし、envファイルから値を読む
    // これはstg環境や本番環境をローカルで動作させたいときに使う
    if (import.meta.env.VITE_IS_LOCAL) return true;
    // 上記を特に設定していない場合はdev環境のみローカルで動作するものとみなす
    return import.meta.env.MODE === "development";
};

const env = {
    APP_TITLE: isLocal() ? import.meta.env.VITE_APP_TITLE : cloudEnv.APP_TITLE,
};

export default env;
