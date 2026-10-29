
import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const DonationForm = ({ causeId }) => {

  const [amount, setAmount] = useState("");
  const [selectedCause, setSelectedCause] = useState(causeId || "");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ================= RECEIPT FUNCTION =================
  const generateReceipt = (amount, name, cause) => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Donation Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Amount: ₹${amount}`, 20, 50);
    doc.text(`Cause: ${cause || "General Donation"}`, 20, 60);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 70);

    doc.save("Donation_Receipt.pdf");
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    setSuccessMsg("");
    setErrorMsg("");

    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const email = localStorage.getItem("email");

    if (!userId) {
      setErrorMsg("Please login first to donate.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setErrorMsg("Please enter a valid donation amount.");
      return;
    }

    try {

      const res = await axios.post("http://localhost:4201/api/donate", {
        user_id: userId,
        name: userName,
        email: email,
        amount: Number(amount),
        cause_id: selectedCause || null
      });

      if (res.data.success) {

        setSuccessMsg("Thank you for your support! Donation successful.");

        // ✅ DOWNLOAD RECEIPT
        generateReceipt(
          amount,
          userName,
          selectedCause
        );

        setAmount("");
        setSelectedCause(causeId || "");

      } else {
        setErrorMsg("Donation failed. Please try again.");
      }

    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
    }

  };

  return (

    <form onSubmit={handleSubmit}>

      {/* ================= CAUSE SELECT ================= */}
      <div className="mb-3">
        <label className="form-label">Select Cause (Optional)</label>

        <select
          className="form-control"
          value={selectedCause}
          onChange={(e) => setSelectedCause(e.target.value)}
        >
          <option value="">General Donation</option>
          <option value="1">Food for Poor Children</option>
          <option value="2">Medical Help</option>
          <option value="3">Education Support</option>
        </select>
      </div>

      {/* ================= AMOUNT ================= */}
      <div className="mb-3">
        <label className="form-label">Donation Amount (INR)</label>

        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          required
        />
      </div>

      {/* ================= MESSAGES ================= */}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      {/* ================= BUTTON ================= */}
      <button type="submit" className="btn btn-success w-100 btn-lg">
        Donate ₹{amount || "0"}
      </button>

    </form>

  );

};

export default DonationForm;