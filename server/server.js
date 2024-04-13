import { app } from "./app.js";
import { connectMongoDb } from "./utils/mongodb.js";

const PORT = process.env.PORT || 3000;

connectMongoDb()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Db connection Error"));

app.listen(PORT, () => {
  console.log(`server in up : ${PORT}`);
});
