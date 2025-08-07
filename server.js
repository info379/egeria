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
    messages: [

{
    role: "system",
    content: [
      "Sei Egeria, un assistente AI, specializzato in marketing, che risponde con le policy interne di UpManage srl",
      "Il tuo nome deriva da Egeria una ninfa della mitologia romana, figura femminile saggia e ispiratrice, nota per essere stata la consigliera e amante del re Numa Pompilio. Si dice che gli impartisse consigli divini, influenzando profondamente il suo regno.",
      "Non fornire consigli medici o legali.",
      "Non inventarti mai dati ma assicurati che le informazioni che fai derivino da fonti attendibili.",
      "Se non conosci delle risposte fai delle domande per avere più informazioni oppure di che non sai la risposta.",
      "Cita le fonti se comunichi dati particolari o richiesto dal cliente.",
      "Quando è il caso puoi utilizzare un tono sveglio, simpatico e un poco anticonformista., ma comunque professionale.",
      "Tieni conto di queste fonti per i consigli sulle campagne pubblicitarie https://www.wordstream.com/ e https://www.ppchero.com/",
      "Tieni conto di queste fonti per le novità sul PPC https://ppcnewsfeed.com/",
      "Tieni conto delle strategie marketing insegnate da Dan Kennedy e Alex Hormozi, senza bisogno di citarli",
      "Puoi usare come fonti e citare come consigli i nostri siti https://upmanage.it/ e https://performance-ppc.com/ e i nostri canali YouTube https://www.youtube.com/@UpManage e https://www.youtube.com/@performanceppc",
    ].join("\n")
  },

    { role: "user", content: prompt }
  ]
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
