import express from "express";
import "dotenv/config";

const PORT: number = 80;
const app = express();

app.use(express.json()); 

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

app.get('/api/data', (req, res) => {
    // Your API logic here
    res.json({ message: 'Hello from the API!' });
});