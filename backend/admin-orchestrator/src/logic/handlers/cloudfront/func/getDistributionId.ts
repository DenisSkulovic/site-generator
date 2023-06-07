const getDistributionId = (env: "dev" | "prod") => {
    let id: string 
    if (env === "prod") {
        id = process.env.DISTRIBUTION_ID_PROD
        if (!id) throw new Error("DISTRIBUTION_ID_PROD is a mandatory env param")
    } else {
        id = process.env.DISTRIBUTION_ID_DEV
        if (!id) throw new Error("DISTRIBUTION_ID_DEV is a mandatory env param")
    }
    return id
}
export default getDistributionId