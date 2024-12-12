import express from 'express';
import cors from 'cors';
import messageRoutes from './routes/messages';

const app = express();
const port = 8000;
app.use(cors());

app.use(express.json());
app.use('/api/messages', messageRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
