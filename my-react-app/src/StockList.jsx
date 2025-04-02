
function StockList({ stocks }) {
    return (
      <div>
        <h3>Stock List</h3>
        {stocks.length === 0 ? (
          <p>No stocks added yet.</p>
        ) : (
          <ul>
            {stocks.map((stock, index) => (
              <li key={index}>
                {stock.symbol} - {stock.quantity} shares @ ${stock.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  export default StockList;