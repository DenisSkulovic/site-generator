import * as http from "node:http";
declare const requestListener: (req: http.IncomingMessage, res: http.ServerResponse) => Promise<void>;
export default requestListener;
