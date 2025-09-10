import { useLocation, useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        ✅ Payment Confirmed!
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        <div className="mb-4">
          <p><strong>Name:</strong> {order.details}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>City:</strong> {order.city}</p>
        </div>

        <h3 className="text-lg font-semibold mb-2">Items:</h3>
        <ul className="list-disc list-inside mb-4">
          {order.items?.map((item, idx) => (
            <li key={idx}>
              {item.name} - {item.price} EGP × {item.quantity}
            </li>
          ))}
        </ul>

        <div className="text-right font-bold text-lg">
          Total Paid: {order.totalPrice} EGP
        </div>
      </div>
    </div>
  );
}
