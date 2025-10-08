import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import ProductsPage from "./productsPage";
import ProductOverViewPage from "./productOverView";
import CartPage from "./cart";
import CheckoutPage from "./checkoutPage";
import HomePage from "../homePage.jsx";
import ReviewPage from "./reviewPage.jsx";
import AboutUsPage from "./aboutusPage.jsx";
import ContactUsPage from "./contactUsPage.jsx";





export default function ClientWebPage() {
	return (
		<div className="w-full h-screen max-h-screen">
			<Header />
			<div className="w-full h-[calc(100%-100px)] ">
				<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/products" element={<ProductsPage />} />
  <Route path="/reviews" element={<ReviewPage />} />
  <Route path="/about-us" element={<AboutUsPage />} />
  <Route path="/contact-us" element={<ContactUsPage />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/overview/:productId" element={<ProductOverViewPage />} />
  <Route path="/checkout" element={<CheckoutPage />} />
  <Route path="/*" element={<h1 className="text-3xl text-center">404 Not Found</h1>} />
</Routes>
			</div>
		</div>
	);
}
