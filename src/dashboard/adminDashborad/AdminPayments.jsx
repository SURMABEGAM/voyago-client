import { useEffect, useState } from "react";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-payments")
      .then((res) => res.json())
      .then((data) => setPayments(data));
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">All Payments</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Amount</th>
            <th>Transaction</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{p.email}</td>
              <td>{p.amount}</td>
              <td>{p.transactionId}</td>
              <td>{new Date(p.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayments;
