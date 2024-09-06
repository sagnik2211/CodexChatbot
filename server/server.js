import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai';

function x(){
dotenv.config();


}
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  });
});

app.post('/', async (req, res) => {
  try { x()
    let openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    const prompt = req.body.prompt;

    if (!prompt) {
      return res.status(400).send({ error: 'Prompt is required' });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
 console.log(response.choices[0].message.content)
    res.status(200).send({
      bot: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

app.listen(3000, () => console.log('AI server started on http://localhost:3000'));