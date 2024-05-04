import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = (props) => {
    let { loanAmt, interestRate, loanTenure, loanEMI, loanStartDate } = props;
    interestRate = interestRate / 100;
    let [year, month] = loanStartDate.split("-").map(item => parseInt(item));

    let monthlyInterestRate = interestRate / 12;
    let data = [];
    let remainingPrincipal = loanAmt;
    let totalPrincipal = 0;
    let totalInterestAccrued = 0;
    let totalPaymentAccrued = 0;

    for (let i = 0; i < loanTenure && remainingPrincipal > 0; i++) {
        const interest = remainingPrincipal * monthlyInterestRate;
        const principal = Math.min(loanEMI - interest, remainingPrincipal);
        remainingPrincipal -= principal;

        totalPrincipal += principal;
        totalInterestAccrued += interest;
        totalPaymentAccrued += loanEMI;

        if (month === 11 || i === loanTenure - 1 || remainingPrincipal <= 0) {
            data.push({
                year: year,
                Principal: totalPrincipal.toFixed(2),
                Interest: totalInterestAccrued.toFixed(2),
                Remaining: Math.max(remainingPrincipal, 0).toFixed(2),
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
        <>
            <ResponsiveContainer height={340} className={`w-100 p-1 mb-5`}>
                <BarChart
                    data={data}
                    margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharrway="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Principal" stackId="a" fill="#8884d8" />
                    <Bar dataKey="Interest" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="Remaining" stackId="a" fill="#ffc655" />
                    <Bar dataKey="TotalPayment" stackId="a" fill="#ff7300" />
                </BarChart>
                <h6 className='fw-light text-center mt-4'>Years &uarr; </h6>
            </ResponsiveContainer>
            <div className="table-responsive mt-5 pt-5">
                <table className="table table-striped table-dark text-center table-bordered">
                    <thead className='p-5'>
                        <tr>
                            <th>Year</th>
                            <th>Principal (A)</th>
                            <th>Interest (B)</th>
                            <th>Total Payment (A + B)</th>
                            <th>Remaining Amount</th>
                            <th>Loan Paid To Date (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((record, index) => (
                            <tr key={index} className=''>
                                <td>{record.year}</td>
                                <td>&#x20B9; {record.Principal}</td>
                                <td>&#x20B9; {record.Interest}</td>
                                <td>&#x20B9; {record.TotalPayment}</td>
                                <td>&#x20B9; {record.Remaining}</td>
                                <td> {((loanAmt - record.Remaining) / loanAmt * 100).toFixed(2)} %</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default BarChartComponent;
