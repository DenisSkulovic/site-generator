"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDirName = () => {
    //const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname();
    // return process.env.NODE_ENV === 'production'? __dirname : __dirname+'/../'
    return process.cwd();
};
exports.default = getDirName;
//# sourceMappingURL=getDirName.js.map