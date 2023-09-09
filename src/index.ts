import express from "express";
import "dotenv/config";

const PORT = 80;
const app = express();

app.use(express.json());

app.get("/api/data", (req, res) => {
    // Your API logic here
    res.json({ message: "Hello from the API!" });
});

app.post("/question", async (req, res) => {
    if (!req.body) {
        res.status(422).json("Not all fields provided!");
        return;
    }
    const prompt: any = req.body.question ?? "What is 5+2";
    try {
        const response = await fetch(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                method: "POST", // Use the POST method
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.API_KEY}`,
                },
                body: JSON.stringify({ prompt, max_tokens: 50 }), // Send prompt and max_tokens in the request body
            }
        );
        if (response.ok) {
            const responseData = await response.json();
            const completionText = responseData.choices[0].text;
            
            // Send the completion text as the response
            res.json({ completion: completionText });
        } else {
            // Handle non-OK response status here, e.g., res.status(response.status).json("Error message");
            //console.error("API Error:" , response.statusText);
            res.status(response.status).json("API Error");
        }
    } catch (error) {
        //console.error("Error:", error);
        res.status(500).json("Internal Server Error");
    }
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Running on port ${PORT}`));