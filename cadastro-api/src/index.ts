import express from "express";
const app = express();

app.use("/", express.static('../cadastro/dist'))

app.get("/api", (req, res) => {
  res.json({ message: "juuj" });
});

app.listen(8080, () => {
  console.log("⚙️ server running on http://127.0.0.1:8080");
});
