// @ts-nocheck
import * as http from "node:http";
import requestListener from "./requestListener"
import dotenv from "dotenv"

dotenv.config()


const host = "localhost";
const port = process.env.PORT
if (!port) throw new Error("cannot start the dev server without the PORT env param")
const port = port;

const createDevServer = () => {
  const server = http.createServer(requestListener);
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });

  return server;
}

export default createDevServer