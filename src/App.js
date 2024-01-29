import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Landscape from "./pages/Landscape/Landscape";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Info from './pages/Info/Info';

function App() {
	return (
		<div>
			<Routes>
				<Route
					path='/'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
				<Route
					path='/gallery'
					element={<Landscape />}
				/>
				<Route
					path='/home'
					element={<Home />}
				/>
				<Route
					path='/info'
					element={<Info />}
				/>
			</Routes>
		</div>
	);
}

export default App;
