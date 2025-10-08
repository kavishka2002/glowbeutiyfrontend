import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import ForgetPasswordPage from "./pages/forgetPasswordPage";
import AdminPage from "./pages/adminPage";
import TestPage from "./pages/testPage";
import { Toaster } from "react-hot-toast";
import ClientWebPage from "./pages/client/clientPage";
import { GoogleOAuthProvider } from "@react-oauth/google";



const clientId = "24297870333-fpg2fjc59lgbqai8a3t9e73q80j8j6je.apps.googleusercontent.com";
function App() {
	return (
		<BrowserRouter>
		<GoogleOAuthProvider clientId={clientId}>
			<div className="w-full h-screen flex justify-center items-center">
					<Toaster position="top-right"/>
					<Routes path="/">						
						<Route path="/login" element={<LoginPage/>}/>
						<Route path="/test" element={<TestPage/>}/>
						<Route path="/register" element={<RegisterPage/>}/>
						<Route path="/admin/*" element={<AdminPage/>}/>
						 <Route path="/forget" element={<ForgetPasswordPage/>} />
						<Route path="/*" element={<ClientWebPage/>}/>

					</Routes>
				
			</div>
			</GoogleOAuthProvider>
		</BrowserRouter>
	);
}

export default App;
