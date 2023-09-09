/* eslint-disable no-console */
import {Router} from "express";
import { OpenAI } from "openai";

const router = Router();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post("/question", async (req, res) => {
    if (!req.body) {
        res.status(422).json("Not all fields provided!");
        return;
    }
    const prompt: any = req.body.question ?? "What is 5 + 2?";

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
            {"role": "user", "content": prompt}
        ],
          });
        
        if (response) {
            console.log(response.choices[0].message.content);
            res.status(201).json(response);
        } else {
            console.error(response);
            res.status(404).json("Error fetching answer from chat gpt");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

export default router;