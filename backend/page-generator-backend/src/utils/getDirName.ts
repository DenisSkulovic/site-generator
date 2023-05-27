import path from "path"

const getDirName = (): string => {
    //const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname();
    // return process.env.NODE_ENV === 'production'? __dirname : __dirname+'/../'
    return process.cwd()
}

export default getDirName