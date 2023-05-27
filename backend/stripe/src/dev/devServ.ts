import * as http from "node:http";
import requestListener from "./requestListener"


const host = "localhost";
const port = 8005;

const createDevServer = () => {
  const server = http.createServer(requestListener);
  server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });

  return server
}

export default createDevServer