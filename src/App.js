import "./App.css";
import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import Rute from "./pages/Rute";
import Bantuan from "./pages/Bantuan";
import Bus from "./pages/Bus";
import Live from "./pages/Live";
import DataDiri from "./pages/DataDiri";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bayar from "./pages/Bayar";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" exact element={<Beranda />} />
					<Route path="/bus" element={<Bus />} />
					<Route path="/rute" element={<Rute />} />
					<Route path="/live" element={<Live />} />
					<Route path="/bantuan" element={<Bantuan />} />
					<Route path="/data-diri" element={<DataDiri />} />
					<Route path="/bayar" element={<Bayar />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

