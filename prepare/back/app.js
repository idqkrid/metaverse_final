const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const noticeRouter = require("./routes/notice");
const updateRouter = require("./routes/upost");
const mailRouter = require("./routes/mail");
const metaRouter = require("./routes/meta");

const db = require("./models");
const passportConfig = require("./passport");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
passportConfig();

app.use(
  cors({
    origin: "http://localhost:3060",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});
// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/notice", noticeRouter);
app.use("/upost", updateRouter);
app.use("/mail", mailRouter);
app.use("/meta", metaRouter);

app.listen(3065, () => {
  console.log("서버 실행 중!");
});
