require("dotenv").config();
const app = require("./server");
require("./db/mongoose");

async function main() {
  await app.listen(app.get("port"));
  console.log(`Server on port ${app.get("port")}`);
}

main();
