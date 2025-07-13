import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const modelId = 'mistral-saba-24b'; 

app.post('/chat', async (req, res) => {
  const { mensagem } = req.body;

  try {
    const prompt = `
    Você é um assistente de inteligência artificial especializado em saúde mental, chamado Evo . Seu objetivo é fornecer suporte emocional, informações baseadas em evidências e orientações preliminares, sempre dentro dos limites de um assistente virtual.

    "${mensagem}"
        `;

    // Realizando a requisição para o modelo de IA
    const resposta = await axios.post(
        `https://api.groq.com/openai/v1/chat/completions`,
        {
        model: modelId,
        messages: [
        {
            role: 'user',
            content: prompt,
        },
            ],
            max_tokens: 1000,
            temperature: 0.7,
        },
        {
            headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
            },
        }
    );

     // Obter a resposta do modelo
    const respostaTexto =resposta.data?.choices?.[0]?.message?.content || 'Desculpe, não consegui compreender sua mensagem. Você pode reformular?';

    // Retornar a resposta
    res.json({ resposta: respostaTexto });
  } catch (erro) {
    console.error(erro.response?.data || erro.message);
    res.status(500).json({ erro: "Erro ao consultar o modelo. Tente novamente mais tarde." });
  }
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});