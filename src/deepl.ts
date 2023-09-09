/* eslint-disable no-console */
import {Router, response} from "express";

const router2 = Router();

router2.post("/deepl", async (req, res) => {
    if (!req.body || !req.body.translate || !req.body.target_lang) {
        res.status(422).json("Not all fields provided!");
        return;
    }
    const translateTxt: any = [req.body.translate] ?? ["Text to be translated"];
    const targetLang: string = req.body.target_lang;
    const responseObj = {
        text: translateTxt,
        target_lang: targetLang,
        source_lang: "EN",
        preserve_formatting: true,
      };

    try {
        const response = await fetch("https://api-free.deepl.com/v2/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `DeepL-Auth-Key ${process.env.DEEPL_API_KEY || "ERROR"}`,
            },
            body: JSON.stringify(responseObj)
        }).then(v => v.json());

        console.log(response);
        if (response) {
            const translatedText = response.translations[0].text;
            
            // Remove space before question marks and exclamation marks
            const modifiedText = translatedText.replace(/\s+\?/g, "?").replace(/\s+\!/g, "!");
            
            res.status(201).json(modifiedText);
        } else {
            res.status(404).json("Error translating");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

router2.post("/deepl-page", async (req, res) => {
    if (!req.body || !req.body.translate || !req.body.target_lang) {
        res.status(422).json("Not all fields provided!");
        return;
    }
    const translateTxt: any = [req.body.translate] ?? ["Text to be translated"];
    const targetLang: string = req.body.target_lang;
    const responseObj = {
        text: translateTxt,
        target_lang: targetLang,
        source_lang: "EN",
        preserve_formatting: true,
        tag_handling: "html"
      };

    try {
        const response = await fetch("https://api-free.deepl.com/v2/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `DeepL-Auth-Key ${process.env.DEEPL_API_KEY || "ERROR"}`,
            },
            body: JSON.stringify(responseObj)
        }).then(v => v.json());

        console.log(response);
        if (response) {
            const translatedText = response.translations[0].text;
            
            // Remove space before question marks and exclamation marks
            const modifiedText = translatedText.replace(/\s+\?/g, "?").replace(/\s+\!/g, "!");
            
            res.status(201).json(modifiedText);
        } else {
            res.status(404).json("Error translating");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

export default router2;