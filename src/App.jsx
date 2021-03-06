import { useState, useEffect } from "react";
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
import { MobileDatePicker } from "@mui/lab";
import logo from "./resources/KFC-logo.png";
import huLocale from "date-fns/locale/hu";
import Switch from "./components/Switch";

function App() {
	const presentDate = new Date();

	const [orderScource, setOrderScource] = useState("W");
	const [date, setDate] = useState(presentDate);
	const [code, setCode] = useState("");
	const [help, setHelp] = useState(false);
	const [footerVis, setFooterVis] = useState(true);
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("darkMode") === "true") {
			setDarkMode(true);
			document.getElementById("root").classList.add("dark");
		}
	}, []);

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
				<div className="title">
					<h1>KFC sajátoldalas-rendelés kereső</h1>
					<div className="dark-mode">
						Dark Mode <Switch darkMode={darkMode} setDarkMode={setDarkMode} />
					</div>
				</div>
			</header>
			<section className="input">
				<Card
					style={{
						maxWidth: 320,
						padding: 10,
						backgroundColor: darkMode ? "#bbb" : "#fff",
						boxShadow: "5px 5px 15px rgba(0,0,0,0.3)",
					}}
				>
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
											code.length < 7
												? `Még ${7 - code.length} karakter szükséges.`
												: code.length > 7
												? "Túl hosszú azonosító."
												: "Megfelelő azonosító."
										}
										error={code.length > 7}
										value={code}
										onChange={(e) =>
											setCode(e.target.value.trim().toUpperCase())
										}
										variant="outlined"
									/>
								</Grid>

								<Grid item xs={12}>
									<LocalizationProvider
										dateAdapter={DateAdapter}
										locale={huLocale}
									>
										<MobileDatePicker
											label="Rendelési dátum"
											orientation="portrait"
											value={date}
											maxDate={presentDate}
											required
											onChange={(newValue) => setDate(newValue)}
											renderInput={(params) => (
												<TextField {...params} style={{ width: "100%" }} />
											)}
										/>
									</LocalizationProvider>
								</Grid>

								<Grid item xs={12}>
									<FormLabel id="radio-label">Rendelési Platform:</FormLabel>
									<RadioGroup
										column
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
											label="Mobil App"
										/>
										<FormControlLabel
											value="C"
											control={<Radio />}
											label="Call Center"
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
			{footerVis && (
				<footer>
					<div>
						{help && (
							<p>
								Ha a rendelés nem tölt be, kérlek ellenőrizd, hogy be vagy-e
								jelentkezve Hurrier-be, a rendelés dátumát, illetve próbáld ki a
								másik rendelési platformmal is. <br />
								Bugokkal és fejlesztési javaslatokkal keresd @Árcsi-t Slacken.
							</p>
						)}
						<Button
							variant="outlined"
							onClick={() => setHelp(!help)}
							style={{ margin: 5 }}
						>
							{help ? "Ok" : "Help"}
						</Button>
						<Button
							variant="outlined"
							onClick={() => setFooterVis(false)}
							style={{
								position: "absolute",
								right: 20,
								top: 20,
							}}
						>
							Hide
						</Button>
					</div>
					<p className="thanks">
						Köszönet az ötletért és a segítségért Vikinek.
					</p>
				</footer>
			)}
		</div>
	);
}

export default App;
