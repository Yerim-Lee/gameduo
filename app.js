const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const users = require("./routes/users");
const config = require("./config/database");

// mongoose
//   .connect(
//     "mongodb+srv://dongga:<a37943794>@cluster0.phmwu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     {
//       // UserNewUrlParser: true, userUnifiedToology: true, userCreateIndex: true, userFindAndModify: false
//     }
//   )
//   .then(() => console.log("MongoDB Connected.."))
//   .catch((err) => console.log(err));

// mongoose.connection.on("conneted", () => {
//   console.log("Conneted to Database" + config.database);
// });

// mongoose.connection.on("error", (err) => {
//   console.log("Database error: " + err);
// });

mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
  console.log("Conneted to Database " + config.database);
});
mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});

const app = express();

const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("<h1>서비스 준비중입니다...</h1>");
});

//라우팅 설정(맨 뒤에 넣을 것)
app.use("/users", users);

//start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
