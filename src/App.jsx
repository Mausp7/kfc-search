import { useState } from "react";
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, /* StaticDatePicker,  */TextField, Button} from "@mui/material";
/* import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
 */
function App() {
  const presentDate = new Date().toISOString().split("T")[0];

  const [orderScource, setOrderScource] = useState("W");
  const [date, setDate] = useState(presentDate);
  const [code, setCode] = useState("");

  const link = `https://hu.eu.logisticsbackoffice.com/dispatcher/order_details/${orderScource}%2FD%2F${date.split("-").join("")}%2F${code}`;
  const altLink = `https://hu.usehurrier.com/dispatcher/order_details/${orderScource}%2FD%2F${date.split("-").join("")}%2F${code}`

  return (
    <div className="App">
      <h1>KFC saját oldalas rendelés</h1>
      <h2>Hurrier link generátor</h2>
      <FormControl>
        <FormLabel id="radio-label">Rendelési Platform:</FormLabel>
        <RadioGroup
          aria-labelledby="Rendelés feladási platform:"
          value={orderScource}
          onChange={(event) => setOrderScource(event.target.value)}
        >
          <FormControlLabel value="W" control={<Radio />} label="Web App" />
          <FormControlLabel value="M" control={<Radio />} label="Mobile App" />
        </RadioGroup>

{/*         <LocalizationProvider dateAdapter={DateAdapter}>
          <StaticDatePicker
            label="Basic example"
            orientation="landscape"
            openTo="day"
            value={date}
            onChange={event => setDate(event.target.value)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
 */}      
        <input 
          type="date" 
          required
          
          max={presentDate}
          value={date}
          onChange={event => setDate(event.target.value)}
        />
      <TextField
              type="text"
              label="Rendelésazonosító"
              placeholder="pl: ABCDEFG"
              value={code}
              onChange={event => setCode(event.target.value.toUpperCase())}
              variant="outlined"
      />
    </FormControl>

      <p>
        <a href={link} target="_blank" rel="noreferrer" >
          <Button 
            variant="contained"
            disabled={code.length !== 7}
          >
            Megnyit
          </Button>
        </a>
        {link}
      </p>
      <p>
        <a href={altLink} target="_blank" rel="noreferrer" >
          <Button 
            variant="contained"
            disabled={code.length !== 7}
          >
            Megnyit
          </Button>
        </a>
        {altLink}
      </p>
    </div>
  );
}

export default App;
