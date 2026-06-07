const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");

dbConnect();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

app.use("/user", UserRouter);
app.use("/", PhotoRouter);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
