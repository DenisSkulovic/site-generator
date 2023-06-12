"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function to check and fetch mandatory environment variables.
const getEnvVariable = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`${key} is a mandatory env param`);
    }
    return value;
};
exports.default = getEnvVariable;
//# sourceMappingURL=getEnvVariable.js.map