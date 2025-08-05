import 'dotenv/config';       // carica le variabili dal file .env
import express from 'express';
import cors from 'cors';

const apiKey = process.env.OPENAI_API_KEY;


const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/egeria', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }]
  })
});

    const data = await response.json();
    res.json({ response: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Errore nel backend' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server backend in ascolto sulla porta ${port}`);
});
