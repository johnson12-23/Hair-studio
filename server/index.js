const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config({ path: "server/.env" });

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "smtp-server" });
});

app.use("/", messageRoutes);

app.listen(port, () => {
  console.log(`[SMTP] Server is running on http://localhost:${port}`);
});
