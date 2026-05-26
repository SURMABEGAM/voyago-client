import { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:5000/all-payments")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setPayments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Pagination
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = payments.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-[#071028] p-3 md:p-6">
      {/* Main Container */}
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-[30px] p-4 md:p-8 shadow-2xl">
        {/* Header */}
        <div className="bg-white rounded-[30px] p-6 md:p-8 shadow-lg border border-slate-200 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 p-4 rounded-2xl">
              <FaMoneyBillWave className="text-3xl text-indigo-700" />
            </div>

            <div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900">
                Payment Management
              </h1>

              <p className="text-slate-600 mt-2 text-sm md:text-base font-medium">
                View all successful payment transactions from users.
              </p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <span className="loading loading-spinner loading-lg text-indigo-600"></span>
          </div>
        ) : currentPayments.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-slate-700">
              No Payments Found
            </h2>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto bg-white rounded-[30px] shadow-xl">
              <table className="table w-full">
                <thead className="bg-[#08122F] text-white">
                  <tr className="text-[15px]">
                    <th className="rounded-tl-[25px]">#</th>
                    <th>User Email</th>
                    <th>Amount</th>
                    <th>Transaction ID</th>
                    <th className="rounded-tr-[25px]">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {currentPayments.map((p, index) => (
                    <tr
                      key={p._id}
                      className="hover:bg-indigo-50 transition duration-300"
                    >
                      {/* Index */}
                      <td className="font-bold text-slate-800">
                        {startIndex + index + 1}
                      </td>

                      {/* Email */}
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="bg-indigo-100 p-2 rounded-full">
                            <FaUserCircle className="text-2xl text-indigo-700" />
                          </div>

                          <div>
                            <h2 className="font-bold text-slate-800">
                              {p.email || "No Email"}
                            </h2>
                          </div>
                        </div>
                      </td>

                      {/* Amount */}
                      <td>
                        <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-black shadow-sm">
                          ৳ {p.amount || 0}
                        </span>
                      </td>

                      {/* Transaction */}
                      <td>
                        <div className="bg-slate-100 px-4 py-3 rounded-2xl inline-block">
                          <p className="font-mono text-sm text-slate-700">
                            {p.transactionId || "N/A"}
                          </p>
                        </div>
                      </td>

                      {/* Date */}
                      <td>
                        <div className="flex items-center gap-2 text-slate-700 font-semibold">
                          <FaCalendarAlt className="text-indigo-600" />

                          <span>
                            {p.createdAt
                              ? new Date(p.createdAt).toLocaleString()
                              : "No Date"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card */}
            <div className="grid gap-5 lg:hidden">
              {currentPayments.map((p, index) => (
                <div
                  key={p._id}
                  className="bg-white rounded-[30px] p-5 shadow-xl"
                >
                  {/* Top */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-slate-900">
                      Payment #{startIndex + index + 1}
                    </h2>

                    <div className="bg-indigo-100 p-3 rounded-2xl">
                      <FaMoneyBillWave className="text-2xl text-indigo-700" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-5">
                    {/* Email */}
                    <div>
                      <p className="text-sm font-semibold text-slate-500 mb-1">
                        User Email
                      </p>

                      <h3 className="font-bold text-slate-800 break-all">
                        {p.email || "No Email"}
                      </h3>
                    </div>

                    {/* Amount */}
                    <div>
                      <p className="text-sm font-semibold text-slate-500 mb-1">
                        Amount
                      </p>

                      <h2 className="text-3xl font-black text-emerald-700">
                        ৳ {p.amount || 0}
                      </h2>
                    </div>

                    {/* Transaction */}
                    <div>
                      <p className="text-sm font-semibold text-slate-500 mb-2">
                        Transaction ID
                      </p>

                      <div className="bg-slate-100 p-3 rounded-2xl">
                        <p className="font-mono text-sm text-slate-700 break-all">
                          {p.transactionId || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div>
                      <p className="text-sm font-semibold text-slate-500 mb-2">
                        Payment Date
                      </p>

                      <div className="flex items-center gap-2 text-slate-700 font-semibold">
                        <FaCalendarAlt className="text-indigo-600" />

                        <span className="text-sm">
                          {p.createdAt
                            ? new Date(p.createdAt).toLocaleString()
                            : "No Date"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center items-center gap-3 mt-10">
              {/* Prev */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl font-bold transition disabled:opacity-40"
              >
                <FaChevronLeft />
                Prev
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num + 1)}
                  className={`w-12 h-12 rounded-2xl font-black transition-all duration-300 ${
                    currentPage === num + 1
                      ? "bg-indigo-600 text-white scale-110 shadow-lg"
                      : "bg-white text-slate-800 hover:bg-slate-200"
                  }`}
                >
                  {num + 1}
                </button>
              ))}

              {/* Next */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="flex items-center gap-2 bg-[#08122F] hover:bg-[#0f1c47] text-white px-5 py-3 rounded-2xl font-bold transition disabled:opacity-40"
              >
                Next
                <FaChevronRight />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPayments;
