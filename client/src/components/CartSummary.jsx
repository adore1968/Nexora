import { FiCreditCard, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/cart/CartContext";

function CartSummary({ cart }) {
  const { clearCart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const handleClearCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your cart?",
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-6 shadow-lg">
      <h2 className="mb-6 text-xl font-bold text-white">Cart Summary</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between text-zinc-400">
          <span>Products</span>
          <span className="text-white">{totalItems}</span>
        </div>

        <div className="flex justify-between text-zinc-400">
          <span>Subtotal</span>
          <span className="text-white">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-zinc-400">
          <span>Shipping</span>

          <span className="text-emerald-400">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="my-6 border-t border-zinc-700" />

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-white">Total</span>

        <span className="text-2xl font-bold text-indigo-400">
          ${total.toFixed(2)}
        </span>
      </div>

      <button
        type="button"
        className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-500"
      >
        <FiCreditCard size={18} />
        Proceed to Checkout
      </button>

      <button
        type="button"
        onClick={handleClearCart}
        className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-red-500/30 px-4 py-3 font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
      >
        <FiTrash2 size={17} />
        Clear Cart
      </button>
    </div>
  );
}

export default CartSummary;
