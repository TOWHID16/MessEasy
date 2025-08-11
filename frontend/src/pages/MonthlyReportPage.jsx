// src/pages/MonthlyReportPage.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService.js';
import Spinner from '../components/Spinner.jsx';
import ThemedInput from '../components/ThemedInput.jsx';
import { Check, Edit } from 'lucide-react';

// ✅ This component is now simpler. It receives data as props and doesn't fetch it.
const MonthlyReportPage = ({ isEditable = false, settlementData, loading, error, refetch }) => {
    const { token } = useAuth();
    const [editingRowEmail, setEditingRowEmail] = useState(null);
    const [mealInputValue, setMealInputValue] = useState(0);
    const [editError, setEditError] = useState('');

    const handleEditClick = (member) => {
        setEditingRowEmail(member.email);
        setMealInputValue(member.meals);
    };

    const handleSaveClick = async (member) => {
        try {
            await apiService.updateUserMeals(member.userId, mealInputValue);
            setEditingRowEmail(null);
            refetch(); // Call the refetch function passed from the parent
        } catch (err) {
            console.error("Failed to update meals:", err);
            setEditError("Failed to update meals.");
        }
    };

    if (loading) return <Spinner />;
    if (error) return <p className="text-red-400">Error: {error}</p>;
    if (!settlementData) return <p className="text-gray-400">No report data available for this month.</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Monthly Settlement Report</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                    <p className="text-gray-400">Total Expenses</p>
                    <p className="text-2xl font-bold">৳{settlementData?.totalExpenses.toFixed(2)}</p>
                </div>
                <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                    <p className="text-gray-400">Total Meals</p>
                    <p className="text-2xl font-bold">{settlementData?.totalMeals}</p>
                </div>
                <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
                    <p className="text-gray-400">Final Meal Rate</p>
                    <p className="text-2xl font-bold text-[#fe5b56]">৳{settlementData?.mealRate.toFixed(2)}</p>
                </div>
            </div>

            {editError && <p className="text-red-400 mb-4">{editError}</p>}

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-700 bg-gray-800">
                            <tr>
                                <th className="p-4">Member</th>
                                <th className="p-4">Meals</th>
                                <th className="p-4">Meal Cost</th>
                                <th className="p-4">Bazar Expense</th>
                                <th className="p-4">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {settlementData?.report.map(item => (
                                <tr key={item.email} className="border-b border-gray-700 last:border-b-0">
                                    <td className="p-4 font-medium">{item.name}</td>
                                    <td className="p-4">
                                        {isEditable && editingRowEmail === item.email ? (
                                            <div className="flex items-center gap-2">
                                                <ThemedInput 
                                                    type="number" 
                                                    value={mealInputValue}
                                                    onChange={(e) => setMealInputValue(e.target.value)}
                                                    className="w-20"
                                                />
                                                <button onClick={() => handleSaveClick(item)} className="text-green-400 hover:text-green-300">
                                                    <Check className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                {item.meals}
                                                {isEditable && (
                                                    <button onClick={() => handleEditClick(item)} className="text-blue-400 hover:text-blue-300">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4">৳{item.mealCost.toFixed(2)}</td>
                                    <td className="p-4">৳{item.expense.toFixed(2)}</td>
                                    <td className={`p-4 font-bold ${item.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        ৳{item.balance.toFixed(2)}
                                        <span className="text-xs font-normal ml-2">{item.balance >= 0 ? '(to receive)' : '(to pay)'}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MonthlyReportPage;