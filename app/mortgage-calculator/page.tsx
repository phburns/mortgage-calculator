'use client';
import { useState } from 'react';

export default function Home() {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const calculateMonthlyPayment = () => {
    if (principal === '' || interestRate === '' || loanTerm === '') {
      setErrorMessage('Please fill out all fields to receive a calculation.');
      return;
    }
  
    const monthlyInterestRate = (interestRate / 100) / 12;
    const totalPayments = loanTerm * 12;
    const numerator = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;
    const payment = numerator / denominator;
    setMonthlyPayment(payment.toFixed(2));
    setErrorMessage('');
  };
  
  const handlePrincipalChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && value >= 0)) {
      setPrincipal(value);
    }
  };
  
  const handleInterestRateChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && value >= 0)) {
      setInterestRate(value);
    }
  };
  
  const handleLoanTermChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && value >= 0)) {
      setLoanTerm(value);
    }
  };

  const clearFields = () => { 
    setPrincipal('');
    setInterestRate('');
    setLoanTerm('');
    setMonthlyPayment('');
    setErrorMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col bg-white p-6 rounded-xl shadow-md space-y-6 text-center w-80">
        <h1 className="text-2xl font-bold text-black">Mortgage Calculator</h1>
        <div>
          <label className="block text-black">Principal amount:</label>
          <input type="number" value={principal} onChange={handlePrincipalChange} className="mt-1 block w-full rounded-md border border-gray-450 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black" />
        </div>
        <div>
          <label className="block text-black">Interest rate (%):</label>
          <input type="number" value={interestRate} onChange={handleInterestRateChange} className="mt-1 block w-full rounded-md border border-gray-450 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black" />
        </div>
        <div>
          <label className="block text-black">Loan term (years):</label>
          <input type="number" value={loanTerm} onChange={handleLoanTermChange} className="mt-1 block w-full rounded-md border border-gray-450 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black" />
        </div>
        <button onClick={calculateMonthlyPayment} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Calculate Monthly Payment</button>
        <button onClick={clearFields} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Clear All Inputs</button>
        {monthlyPayment && <p className="text-lg font-bold text-black">Monthly Payment: ${monthlyPayment}</p>}
        {errorMessage && <p className="text-lg font-bold text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}
