import { useState } from "react";

function App() {
  const presentDate = new Date().toISOString().split("T")[0];

  const [orderScource, setOrderScource] = useState("W");
  const [date, setDate] = useState(presentDate);
  const [code, setCode] = useState("");
  const [frameScource, setFrameScource] = useState("");


  const link = `https://hu.eu.logisticsbackoffice.com/dispather/order_details/${orderScource}%2FD%2F${date.split("-").join("")}%2F${code}`;
  const altLink = `https://hu.usehurrier.com/dispather/order_details/${orderScource}%2FD%2F${date.split("-").join("")}%2F${code}`

  return (
    <div className="App">
      <h1>KFC saját oldalas rendelés kereső</h1>
      <input 
        type="text"
        required
        value={orderScource}
        onChange={event => setOrderScource(event.target.value)}
      />
      <input 
        type="date" 
        required

        max={presentDate}
        value={date}
        onChange={event => setDate(event.target.value)}
      />
      <input 
        type="text"
        required

        value={code}
        onChange={event => setCode(event.target.value)}
      />
      <p>{link}</p>
      <button onClick={() => setFrameScource(link)}>Mutat</button>
      <p>{altLink}</p>
      <button onClick={() => setFrameScource(altLink)}>Mutat</button>

      <iframe src={`ˇ${frameScource}ˇ`} title="result-iframe" frameBorder="0"></iframe>
      <a href={frameScource} target="_blank" rel="noreferrer" ><button>Megnyit</button></a>
    </div>
  );
}

export default App;
