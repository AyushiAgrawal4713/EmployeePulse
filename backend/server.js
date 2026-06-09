const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();   // ✅ FIRST create app

app.use(cors());
app.use(express.json());


const moodRoutes = require("./routes/mood");

app.use("/api/mood", moodRoutes);
app.use(
  "/api/auth",
  require("./routes/auth")
);
app.use(
    "/api/recognition",
    require("./routes/recognition")
);
app.use(
    "/api/users",
    require("./routes/users")
);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("EmployeePulse API Running");
});
console.log(app._router?.stack);
app.get("/check123", (req, res) => {
    res.send("SERVER UPDATED");
});
app.listen(process.env.PORT, () => {
  console.log(`Server Running on ${process.env.PORT}`);
});