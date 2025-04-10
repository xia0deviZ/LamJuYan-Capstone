import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "ESMUMWZBCT9O5SEJ"; 

function App() {
  const [stocks, setStocks] = useState(() => {
    return JSON.parse(localStorage.getItem("stocks")) || [];
  });
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  useEffect(() => {
    localStorage.setItem("stocks", JSON.stringify(stocks));
  }, [stocks]);

  const getStockPrice = async (symbol) => {
    try {
      const response = await axios.get(
        https //www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}
      );
      return parseFloat(response.data["Global Quote"]["05. price"]);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      return null;
    }
  };

  const addStock = async () => {
    if (!symbol || !quantity || !purchasePrice) {
      alert("Please fill in all fields.");
      return;
    }

    const currentPrice = await getStockPrice(symbol);
    if (!currentPrice) {
      alert("Invalid stock symbol or API error.");
      return;
    }

    const newStock = {
      id: Date.now(),
      symbol: symbol.toUpperCase(),
      quantity: parseFloat(quantity),
      purchasePrice: parseFloat(purchasePrice),
      currentPrice: currentPrice,
      profitLoss:
        (currentPrice - parseFloat(purchasePrice)) * parseFloat(quantity),
    };

    setStocks([...stocks, newStock]);

    setSymbol("");
    setQuantity("");
    setPurchasePrice("");
  };

  const deleteStock = (id) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  return (
    <div className="container">
      <h1>📊 Finance Dashboard</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Purchase Price"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
        />
        <button onClick={addStock}>Add Stock</button>
      </div>

      <h2>Stock List</h2>
      <ul>
        {stocks.length === 0 ? (
          <p>No stocks added yet.</p>
        ) : (
          stocks.map((stock) => (
            <li key={stock.id}>
              <p>Symbol: {stock.symbol}</p>
              <p>Quantity: {stock.quantity}</p>
              <p>Purchase Price: ${stock.purchasePrice.toFixed(2)}</p>
              <p>Current Price: ${stock.currentPrice.toFixed(2)}</p>
              <p
                className={stock.profitLoss >= 0 ? "profit" : "loss"}
              >
                Profit/Loss: ${stock.profitLoss.toFixed(2)}
              </p>
              <button onClick={() => deleteStock(stock.id)}>❌ Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;