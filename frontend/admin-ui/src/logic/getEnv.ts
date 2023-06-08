const getEnv = (): "dev" | "prod" => {
    const env = process.env.VITE_APP_ENVIRONMENT
    if (!env) throw new Error("VITE_APP_ENVIRONMENT is a mandatory env param")
    if (!(["dev", "prod"]).includes(env)) throw new Error("VITE_APP_ENVIRONMENT can only be 'dev' or 'prod'")
    return env as "dev" | "prod"
}
export default getEnv