// import React from 'react';

// const LoanTable = (props) => {
//     const data = props.data;
//     const loanAmt = props.loanAmt;
//     return (
//         <div className="table-responsive">
//             <table className="table table-bordered">
//                 <thead>
//                     <tr>
//                         <th>Year</th>
//                         <th>Principal (A)</th>
//                         <th>Interest (B)</th>
//                         <th>Total Payment (A + B)</th>
//                         <th>Remaining Amount</th>
//                         <th>Loan Paid To Date (%)</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((record, index) => (
//                         <tr key={index}>
//                             <td>{record.year}</td>
//                             <td>{record.Principal}</td>
//                             <td>{record.Interest}</td>
//                             <td>{record.TotalPayment}</td>
//                             <td>{record.Remaining}</td>
//                             <td>{((loanAmt - record.Remaining) / loanAmt * 100).toFixed(2)}%</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default LoanTable;
