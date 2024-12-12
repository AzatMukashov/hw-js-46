import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dataPath = path.join(__dirname, '../db.json');

interface Message {
    author?: string;
    message: string;
    image?: string;
}

router.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    res.json(data);
});

router.post('/', (req, res) => {
    const { author = 'Anonymous', message, image } = req.body as Message;

    if (!message) {
        res.status(400).json({ error: 'Message is required' });
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    data.push({ author, message, image });
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.status(201).json({ author, message, image });
});

export default router;
