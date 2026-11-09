import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

//component
import Navbar from "./components/Navbar";

//pages
import Cart from "./components/Cart";
import Login from "./authentification/Login";
import Register from "./authentification/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";

//route
import ProtectedRoute from "./routing/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile/:username" element={<Profile />} />
                <Route path="/profile/" element={<Profile />} />
              </Route>
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/profile" element={<Navigate to="/profile/Guest" replace />} /> */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
