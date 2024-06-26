const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const hpp = require("hpp");
const helmet = require("helmet");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const noticeRouter = require("./routes/notice");
const updateRouter = require("./routes/upost");
const mailRouter = require("./routes/mail");
const metaRouter = require("./routes/meta");

const db = require("./models");
const passportConfig = require("./passport");

const webSocket = require("./socket");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);
passportConfig();

if (process.env.NODE_ENV === "production") {
  app.use(hpp());
  app.use(helmet());
} else {
}

app.use(
  cors({
    origin: ["http://localhost:3060", "http://zepmetaverse.com"],
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
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === "production" && ".zepmetaverse.com",
    },
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

const server = app.listen(80, () => {
  console.log("서버 실행중..");
});

webSocket(server, app);