import { useEffect, useReducer, useState } from "react";

const currencies = ["USD", "EUR", "CAD", "INR"];

export default function Test() {
  const [number, setNumber] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState();

  function handleInputChange(e) {
    setNumber(Number(e.target.value));
  }

  useEffect(() => {
    async function convertCurrency() {
      if (fromCurrency === toCurrency) return;

      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${number}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await res.json();
        console.log(data.rates[toCurrency]);
        setResult(data.rates[toCurrency]);
      } catch (error) {
        console.error(error);
      }
    }
    convertCurrency();
  }, [number, fromCurrency, toCurrency]);

  return (
    <div>
      <input value={number} onChange={handleInputChange} />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {currencies.map((currency, i) => (
          <option key={i} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {currencies.map((currency, i) => (
          <option key={i} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <br />
      <p>
        {number > 0 && (
          <>
            {result} {toCurrency}
          </>
        )}
      </p>
    </div>
  );
}
