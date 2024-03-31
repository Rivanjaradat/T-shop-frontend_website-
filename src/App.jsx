import "./App.css";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/Sign in/SignIn";
import SignUp from "./Pages/Sign Up/SignUp";
import Categories from "./Pages/Categories/Categories";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";
import CategoryProduct from "./Pages/Categories/CategotyProduct";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import NotFound from "./Components/notfound/NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import UserContextProvider from "./Context/User";

import ProductDetails from "./Pages/Products/ProductDetails";
import Order from "./Pages/Order/Order";
import Profile from "./Pages/Profile/Profile";
import Contact from "./Pages/Profile/Contact/Contact";
import AllOrder from "./Pages/Profile/AllOrder";
import Info from "./Pages/Profile/Info/Info";
import OrderDetails from "./Pages/Order/OrderDetails"
import Forgot from "./Pages/Forgot password/Forgot";
import Reviews from "./Pages/reviews/Reviews";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      { path: "/home", element: <Home /> },
      { path: "/", element: <Home /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/categories", element: <Categories /> },
      { path: "/profile", element: <Profile /> },
      { path: "/profile/contact", element: <Contact /> },
      { path: "/profile/order", element: <AllOrder /> },
      { path: "/profile/information", element: <Info /> },
      { path: "/categories/:id", element: <CategoryProduct /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/orderDetails", element: <OrderDetails/> },
      { path: "/cart/order", element: <Order /> },
     { path: "/review", element: <Reviews /> },
      {
        path: "/cart",
        element: (
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/forgotPassword",
        element: <Forgot />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  const toasterOptions = {
    position: "bottom-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };

  return (
    <>
      <UserContextProvider>
        {" "}
        <RouterProvider router={router} />
      </UserContextProvider>

      <ToastContainer {...toasterOptions} />
    </>
  );
}

export default App;
