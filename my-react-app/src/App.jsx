import { useState } from "react";
import StockForm from "./StockForm"
import StockList from "./StockList"




function App() {
  const [stocks, setStocks] = useState([]);

  const addStock = (newStock) => {
    setStocks([...stocks, newStock]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Finance Dashboard</h2>
      <StockForm onAddStock={addStock}/>
      <StockList stocks={stocks}/>
    </div>
  );
}

export default App;



  




