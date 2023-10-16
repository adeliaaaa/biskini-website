import "./App.css";
import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import Rute from "./pages/Rute";
import Bantuan from "./pages/Bantuan";
import Bus from "./pages/Bus";
import Live from "./pages/Live";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/admin/Login";
import Agensi from "./pages/admin/Agensi";
import CreateAgensi from "./pages/admin/CreateAgensi";
import EditAgensi from "./pages/admin/EditAgensi";
import BusAdmin from "./pages/admin/Bus";
import CreateBus from "./pages/admin/CreateBus";
import EditBus from "./pages/admin/EditBus";

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
					<Route path="/admin" element={<AdminLogin />} />
					<Route path="/admin/agensi" element={<Agensi />} />
					<Route path="/admin/agensi/add" element={<CreateAgensi />} />
					<Route path="/admin/agensi/edit" element={<EditAgensi />} />
					<Route path="/admin/bus" element={<BusAdmin />} />
					<Route path="/admin/bus/add" element={<CreateBus />} />
					<Route path="/admin/bus/edit" element={<EditBus />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;

