import api from "./app";
import { HOST, PORT } from "./config";
import cluster from "cluster";
import { cpus } from "os";
import { worker } from "cluster";

/*if (cluster.isMaster) {
  console.log("System has " + cpus().length)
  for (let index = 0; index < cpus().length; index++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code or signal ${
        code || signal
      }. Restarting worker ....`
    );
    cluster.fork();
  });
*/ //} else {
 // console.log("I am cluster " + worker.process.pid);
  api.set("port", 4445);
 // console.log(process.cwd())
  api.listen(api.get("port"), '0.0.0.0' ,() => {
    console.info(`Api çalışıyor, http://${HOST}:${PORT}`);
  });
//}
 

