import express from "express";
import "dotenv/config";

const PORT = 80;
const app = express();

app.use(express.json());

app.get("/api/data", (req, res) => {
    // Your API logic here
    res.json({ message: "Hello from the API!" });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Running on port ${PORT}`));