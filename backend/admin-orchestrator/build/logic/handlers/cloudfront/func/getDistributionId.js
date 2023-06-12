"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getEnvVariable_1 = __importDefault(require("@/logic/getEnvVariable"));
const getDistributionId = (env) => {
    const envVarName = `DISTRIBUTION_ID_${env.toUpperCase()}`;
    const distributionId = (0, getEnvVariable_1.default)(envVarName);
    if (!distributionId)
        throw new Error(`${envVarName} is a mandatory env param`);
    return distributionId;
};
exports.default = getDistributionId;
//# sourceMappingURL=getDistributionId.js.map