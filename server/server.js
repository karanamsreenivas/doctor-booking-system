require("dotenv").config();

console.log("#################################");
console.log("THIS SERVER FILE IS RUNNING");
console.log(__filename);
console.log("#################################");

const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});