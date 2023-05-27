import * as http from "http";
import requestListener from "./requestListener"


const host = "localhost";
const PORT = Number(process.env.PORT)
if (!PORT) throw new Error("cannot start the dev server without the PORT env param")
const port = PORT;

const createDevServer = () => {
  const server = http.createServer(requestListener);
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });

  return server
}

export default createDevServer