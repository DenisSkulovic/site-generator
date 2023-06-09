const getLiveEditorUrl = (env: "dev" | "prod") => {
    const VITE_APP_LIVE_EDITOR_DEV: string | undefined = import.meta.env.VITE_APP_LIVE_EDITOR_DEV
    const LIVE_EDITOR_PROD: string | undefined = import.meta.env.LIVE_EDITOR_PROD

    let url: string
    if (env !== "prod") {
        if (!VITE_APP_LIVE_EDITOR_DEV) throw new Error("VITE_APP_LIVE_EDITOR_DEV is a mandatory env param")
        url = VITE_APP_LIVE_EDITOR_DEV
    } else {
        if (!LIVE_EDITOR_PROD) throw new Error("VITE_APP_LIVE_EDITOR_DEV is a mandatory env param")
        url = LIVE_EDITOR_PROD
    }
    return url
}

export default getLiveEditorUrl