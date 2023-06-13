import getEnvVariable from "../../../../logic/getEnvVariable";

const getDistributionId = (env: "dev" | "prod"): string => {
    const envVarName = `DISTRIBUTION_ID_${env.toUpperCase()}`
    const distributionId: string = getEnvVariable(envVarName);
    if (!distributionId) throw new Error(`${envVarName} is a mandatory env param`)
    return distributionId
}

export default getDistributionId
