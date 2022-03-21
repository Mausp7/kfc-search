import "./Switch.scss";

const Switch = ({ darkMode, setDarkMode }) => {
	return (
		<div
			className="switch"
			style={
				darkMode ? { backgroundColor: "#ccc" } : { backgroundColor: "#333" }
			}
			onClick={() => {
				localStorage.setItem("darkMode", !darkMode);
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
								backgroundColor: "#222",
						  }
						: { left: "1%", backgroundColor: "#ddd" }
				}
			></div>
		</div>
	);
};

export default Switch;
