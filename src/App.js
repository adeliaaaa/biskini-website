import "./App.css";
import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import Rute from "./pages/Rute";
import Jadwal from "./pages/Jadwal";
import Bus from "./pages/Bus";
import Beli from "./pages/Beli";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" exact element={<Beranda />} />
					<Route path="/rute" element={<Rute />} />
					<Route path="/jadwal" element={<Jadwal />} />
					<Route path="/bus" element={<Bus />} />
					<Route path="/beli" element={<Beli />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

