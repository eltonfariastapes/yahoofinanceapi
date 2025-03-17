require("dotenv").config();

const express = require("express");
const yahooFinance = require("yahoo-finance2").default;
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Rota para buscar cotação
app.get("/cotacao", async (req, res) => {
  try {
    const { symbol } = req.query; // Exemplo: PETR4.SA, AAPL, TSLA
    if (!symbol) {
      return res.status(400).send("Símbolo da ação é obrigatório");
    }

    // Busca a cotação
    const data = await yahooFinance.quote(symbol);

    // Retorna apenas o preço de mercado (como número)
    res.send(data.regularMarketPrice.toString()); // Convertendo para string para evitar problemas de formatação
  } catch (error) {
    res.status(500).send("Erro ao buscar cotação");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
