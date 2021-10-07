import api from "./app";
import { HOST, PORT } from "./config";

api.set("port", 4445);

api.listen(api.get("port"), '0.0.0.0' ,() => {
  console.info(`Api çalışıyor, http://${HOST}:${PORT}`);
});

 

