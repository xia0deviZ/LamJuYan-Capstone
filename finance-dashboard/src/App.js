import React, { useState } from "react";
import axios from "axios";
import "./index.css"; // Make sure your styles are being applied
<h1>
  <span role="img" aria-label="calculator">🧮</span> Finance Dashboard
</h1>

const API_KEY = "5B2PRPOXHTPAV8LZ"

function App() {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [stocks, setStocks] = useState([]);

  const getStockPrice = async (symbol) => {
    try {
      const response = await axios.get(
        'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}'
      );
      console.log("Full API Response:", JSON.stringify(response.data, null, 2));
      
      return parseFloat(response.data["Global Quote"]["05. price"]);
    } catch (error) {
      console.error("API error:", error);
      return null;
    }
  };

  const addStock = async () => {
    if (!symbol || !quantity || !purchasePrice) {
      alert("Please fill all fields");
      return;
    }
    const currentPrice = await getStockPrice(symbol.toUpperCase());
    
    if (!currentPrice) {
      alert("Invalid stock symbol");
      return;
    }

    const newStock = {
      id: Date.now(),
      symbol: symbol.toUpperCase(),
      quantity: parseFloat(quantity),
      purchasePrice: parseFloat(purchasePrice),
      currentPrice,
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
      <h1>Finance Dashboard</h1>

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
                style={{
                  color: stock.profitLoss >= 0 ? "green" : "red",
                }}
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
