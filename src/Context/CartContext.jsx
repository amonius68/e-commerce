import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const [noOfCartItems, setNoOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [cartId, setCartId] = useState(null);

    let headers = {
        token: localStorage.getItem("userToken")
    };

    const handleCartUpdate = (response) => {
        setCartId(response.data.data._id);
        setNoOfCartItems(response.data.numOfCartItems);
        setTotalCartPrice(response.data.data.totalCartPrice);
        return response;
    };

    async function addToCart(productId) {
        return await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            productId
        }, { headers })
        .then((response) => {
            toast.success(response.data.message);
            return handleCartUpdate(response);
        }).catch((err) => {
            toast.error(err.response?.data?.message || "An error occurred");
            return err;
        });
    }

    async function getCart() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
        .then((response) => handleCartUpdate(response))
        .catch((err) => {
            toast.error(err.response?.data?.message || "An error occurred");
            return err;
        });
    }

    async function removeCartItem(productId) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
        .then((response) => {
            toast.success("Item removed from cart");
            return handleCartUpdate(response);
        }).catch((err) => {
            toast.error(err.response?.data?.message || "An error occurred");
            return err;
        });
    }

    async function updateProduct(productId, count) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers })
        .then((response) => {
            toast.success("Cart updated");
            return handleCartUpdate(response);
        }).catch((err) => {
            toast.error(err.response?.data?.message || "An error occurred");
            return err;
        });
    }

async function onlinePayment(shippingAddress) {
  return await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173/e-commerce`,
      { shippingAddress },
      { headers }
  ).then((response) => {
      // بدلاً من التحويل المباشر
      toast.success("Online payment started");
      return response;
  }).catch((err) => {
      toast.error(err.response?.data?.message || "An error occurred");
      return err;
  });
}

async function cashPayment(shippingAddress) {
  return await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      { shippingAddress },
      { headers }
  ).then((response) => {
      toast.success("Cash payment confirmed");
      return response;
  }).catch((err) => {
      toast.error(err.response?.data?.message || "An error occurred");
      return err;
  });
}



    async function clearCart() {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
        .then((response) => {
            setNoOfCartItems(0);
            setTotalCartPrice(0);
            toast.success("Cart cleared");
            return response;
        }).catch((err) => {
            toast.error(err.response?.data?.message || "An error occurred");
            return err;
        });
    }

    return (
        <CartContext.Provider value={{
            addToCart,
            cashPayment,
            getCart,
            removeCartItem,
            updateProduct,
            clearCart,
            noOfCartItems,
            totalCartPrice,
            onlinePayment
        }}>
            {props.children}
        </CartContext.Provider>
    );
}
