import { useState } from "react";

function StockForm({ onAddStock }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symbol || !quantity || !price) return;

    onAddStock({ symbol, quantity, price });
    setSymbol("");
    setQuantity("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="AAPL"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        type="number"
        placeholder="2"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="number"
        placeholder="123.99"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Add Stock</button>
    </form>
  );
}

export default StockForm;