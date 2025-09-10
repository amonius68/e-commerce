import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/allorders");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-700 mb-4">✅ Payment Confirmed!</h1>
      <p className="text-gray-700">
        You will be redirected to your orders in {counter}...
      </p>
    </div>
  );
}
