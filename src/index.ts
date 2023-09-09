/* eslint-disable no-console */
import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./chatGPT";
import router2 from "./deepl";

const PORT = 80;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use("/api", router2);

app.get("/api/data", (req, res) => {
    // Your API logic here
    res.json({ message: "Hello from the API!" });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));