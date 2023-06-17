// Function to check and fetch mandatory environment variables.
const getEnvVariable = (key: string): string => {
    const value = process.env[key]
    if (!value) {
        throw new Error(`${key} is a mandatory env param`)
    }
    return value
}

export default getEnvVariable