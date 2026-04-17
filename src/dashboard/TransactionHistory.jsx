import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/Authcontext";

const TransactionHistory = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/transactions/${user.email}`)
        .then((res) => setTransactions(res.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-amber-700">
        💳 Transaction History
      </h1>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-800">No transactions found 😔</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className=" text-shadow-black bg-gray-200">
              <tr>
                <th className="text-shadow-indigo-500">Title</th>
                <th className="text-shadow-indigo-500">Amount</th>
                <th className="text-shadow-indigo-500">Transaction ID</th>
                <th className="text-shadow-indigo-500">Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item) => (
                <tr key={item._id}>
                  <td className="text-shadow-black">{item.title}</td>
                  <td className="text-shadow-black">৳ {item.amount}</td>
                  <td className="text-shadow-black text-xs">
                    {item.transactionId}
                  </td>
                  <td className="text-shadow-black">
                    {new Date(item.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
