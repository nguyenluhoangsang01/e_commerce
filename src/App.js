import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Cart, Checkout, Navbar, Products } from "./components";
import { default as commerce } from "./lib/commerce";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list().catch((error) => {
      console.log("There was an error fetching the products", error);
    });
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(
      await commerce.cart.retrieve().catch((error) => {
        console.log("There was an error fetching the cart", error);
      })
    );
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart
      .add(productId, quantity)
      .catch((error) => {
        console.error("There was an error adding the item to the cart", error);
      });
    setCart(cart);
  };

  const handleUpdateCartQuantity = async (productId, quantity) => {
    const { cart } = await commerce.cart
      .update(productId, { quantity })
      .catch((error) => {
        console.error("There was an error updating the cart", error);
      });

    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId).catch((error) => {
      console.error(
        "There was an error removing the item from the cart",
        error
      );
    });

    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty().catch((error) => {
      console.error("There was an error emptying the cart", error);
    });
    setCart(cart);
  };

  const refreshCart = async () => {
    await commerce.cart
      .refresh()
      .then((newCart) => setCart(newCart))
      .catch((error) =>
        console.log("There was an error refreshing the cart", error)
      );
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    await commerce.checkout
      .capture(checkoutTokenId, newOrder)
      .then((incomingOrder) => {
        setOrder(incomingOrder);
        refreshCart();
      })
      .catch((error) => setErrorMessage(error.data.error.message));
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <BrowserRouter>
      <Navbar totalItems={cart.total_items} />

      <Routes>
        <Route
          path="/"
          element={
            <Products products={products} onAddToCart={handleAddToCart} />
          }
        ></Route>
        <Route
          path="cart"
          element={
            <Cart
              cart={cart}
              onUpdateCartQuantity={handleUpdateCartQuantity}
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyCart={handleEmptyCart}
            />
          }
        />
        <Route
          path="checkout"
          element={
            <Checkout
              cart={cart}
              order={order}
              errorMessage={errorMessage}
              handleCaptureCheckout={handleCaptureCheckout}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
