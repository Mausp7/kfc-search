import "./Switch.scss";

const Switch = ({ darkMode, setDarkMode }) => {
	return (
		<div
			className="switch"
			style={
				darkMode ? { backgroundColor: "#222" } : { backgroundColor: "#eee" }
			}
			onClick={() => {
				setDarkMode(!darkMode);
				document.getElementById("root").classList.toggle("dark");
			}}
		>
			<div
				className="switch-button"
				style={
					darkMode
						? {
								left: "99%",
								transform: "translate(-100%, -50%)",
								backgroundColor: "#eee",
						  }
						: { left: "1%", backgroundColor: "#222" }
				}
			></div>
		</div>
	);
};

export default Switch;
