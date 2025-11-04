import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export const SendMoney: React.FC = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("id");   
  const name = searchParams.get("name");   
  const firstName = name?.split(" ")[0] || "";
  const lastName = name?.split(" ")[1] || "";

  const handleTransfer = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (!userId) {
      alert("Invalid recipient ID");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: userId,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || `₹${amount} sent successfully!`);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Transfer failed");
      } else {
        alert("Transfer failed");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>

          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{firstName[0] || "?"}</span>
              </div>
              <h3 className="text-2xl font-semibold">
                {firstName} {lastName}
              </h3>
            </div>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount (in ₹)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  placeholder="Enter amount"
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <button
                onClick={handleTransfer}
                disabled={loading}
                className={`justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full ${
                  loading
                    ? "bg-gray-400"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {loading ? "Sending..." : "Initiate Transfer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
