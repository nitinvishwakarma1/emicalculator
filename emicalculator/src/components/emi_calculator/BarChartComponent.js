
import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoanTable from './LoanTable';

const BarChartComponent = () => {
    let loanAmt = 100000;
    let interestRate = 0.05;
    let loanTenure = 12;
    let loanEMI = 8561;
    let totalInterest = 2729;
    let totalPayment = 102729;
    let loanStartDate = new Date(2024, 4);
    let monthlyInterestRate = interestRate / 12;
    let data = [];
    let remainingPrincipal = loanAmt;
    let year = loanStartDate.getFullYear();
    let month = loanStartDate.getMonth();
    let totalPrincipal = 0;
    let totalInterestAccrued = 0;
    let totalPaymentAccrued = 0;

    for (let i = 0; i < loanTenure; i++) {
        const interest = remainingPrincipal * monthlyInterestRate;
        const principal = loanEMI - interest;
        remainingPrincipal -= principal;

        totalPrincipal += principal;
        totalInterestAccrued += interest;
        totalPaymentAccrued += loanEMI;

        // If it's the end of the year or the last month, add data for the year
        if (month === 11 || i === loanTenure - 1) {
            data.push({
                year: year,
                Principal: totalPrincipal.toFixed(2),
                Interest: totalInterestAccrued.toFixed(2),
                Remaining: Math.max(remainingPrincipal, 0).toFixed(2), // Ensure remaining amount is not negative
                TotalPayment: totalPaymentAccrued.toFixed(2)
            });
            totalPrincipal = 0;
            totalInterestAccrued = 0;
            totalPaymentAccrued = 0;

        }

        month++;
        if (month === 12) {
            month = 0;
            year++;
        }
    }

    

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Principal" stackId="a" fill="#8884d8" />
                <Bar dataKey="Interest" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Remaining" stackId="a" fill="#ffc658" />
                <Bar dataKey="TotalPayment" stackId="a" fill="#ff7300" />
            </BarChart>
        </ResponsiveContainer >
    );
};

export default BarChartComponent;
