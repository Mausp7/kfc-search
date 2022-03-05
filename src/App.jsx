import { useState } from "react";
import {
	Card,
	CardContent,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
	TextField,
	Button,
	Grid,
	Typography,
} from "@mui/material";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import logo from "./resources/KFC-logo.png";

function App() {
	const presentDate = new Date();

	const [orderScource, setOrderScource] = useState("W");
	const [date, setDate] = useState(presentDate);
	const [code, setCode] = useState("");

	const link = `https://hu.eu.logisticsbackoffice.com/dispatcher/order_details/${orderScource}%2FD%2F${date
		.toISOString()
		.split("T")[0]
		.split("-")
		.join("")}%2F${code}`;
	const altLink = `https://hu.usehurrier.com/dispatcher/order_details/${orderScource}%2FD%2F${date
		.toISOString()
		.split("T")[0]
		.split("-")
		.join("")}%2F${code}`;

	return (
		<div className="App">
			<header>
				<img src={logo} alt="logo" />
				<h1>KFC sajátoldalas-rendelés kereső</h1>
			</header>
			<section className="input">
				<Card style={{ maxWidth: 310, padding: 10 }}>
					<Typography variant="h5" align="center">
						Hurrier link generátor
					</Typography>
					<CardContent>
						<FormControl>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<TextField
										type="text"
										fullWidth
										label="Rendelésazonosító"
										placeholder="pl: ABCDEFG"
										helperText={
											code.length !== 7
												? `Még ${7 - code.length} karakter.`
												: null
										}
										error={code.length > 7}
										value={code}
										onChange={(e) => {
											if (e.target.value.length < 8)
												setCode(e.target.value.toUpperCase());
										}}
										variant="outlined"
									/>
								</Grid>

								<Grid item xs={12}>
									<LocalizationProvider dateAdapter={DateAdapter}>
										<DatePicker
											label="Rendelési dátum"
											orientation="landscape"
											value={date}
											maxDate={presentDate}
											required
											onChange={(newValue) => setDate(newValue)}
											renderInput={(params) => <TextField {...params} />}
										/>
									</LocalizationProvider>
								</Grid>

								<Grid item xs={12}>
									<FormLabel id="radio-label">Rendelési Platform:</FormLabel>
									<RadioGroup
										row
										value={orderScource}
										onChange={(event) => setOrderScource(event.target.value)}
									>
										<FormControlLabel
											value="W"
											control={<Radio />}
											label="Web App"
										/>
										<FormControlLabel
											value="M"
											control={<Radio />}
											label="Mobile App"
										/>
									</RadioGroup>
								</Grid>
							</Grid>
						</FormControl>
					</CardContent>
				</Card>
				{code.length === 7 && (
					<div className="links">
						<p>{link}</p>
						<a href={link} target="_blank" rel="noreferrer">
							<Button
								variant="contained"
								disabled={code.length !== 7}
								style={{ margin: 10 }}
							>
								Megnyit
							</Button>
						</a>
						<p>{altLink}</p>
						<a href={altLink} target="_blank" rel="noreferrer">
							<Button
								variant="contained"
								disabled={code.length !== 7}
								style={{ margin: 10 }}
							>
								Megnyit
							</Button>
						</a>
					</div>
				)}
			</section>
		</div>
	);
}

export default App;
