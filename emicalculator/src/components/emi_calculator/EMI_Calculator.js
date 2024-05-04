import { useEffect, useState } from 'react';
import styles from './emiCalculator.module.css';
import Piechart from './PieChart.js';
import { Navigate, useNavigate } from 'react-router-dom';
import BarChartComponent from './BarChartComponent.js';
import html2pdf from 'html2pdf.js';



export const EMI_Calculator = () => {
    let [personalLoanAmt, setPersonalLoanAmt] = useState(100000);
    let [personalLoanInterest, setPersonalLoanInterest] = useState(5);
    let [loanTenure, setLoanTenure] = useState(12);
    let [totalPayment, setTotalPayment] = useState(102729);
    let [emiPerMonth, setEMIPerMonth] = useState(8560.75);
    let [totalInterest, setTotalInterest] = useState(2729);
    let [principalPercentage, setPrincipalPercentage] = useState(97.3);
    let [interestPercentage, setInterestPercentage] = useState(2.7);
    let [loanStartDate, setLoanStartDate] = useState("2024-05");

    const handleSubmit = () => {
        let emiPerMonth = emiCalculator(personalLoanAmt, personalLoanInterest, loanTenure);
        let totalPayment = parseFloat((emiPerMonth * loanTenure).toFixed(2));
        // console.log("type of totalPayment ====> ",typeof totalPayment);
        let totalInterest = (totalPayment - personalLoanAmt).toFixed(2);
        setEMIPerMonth(emiPerMonth);
        setTotalPayment(totalPayment);
        setTotalInterest(totalInterest);

        let principalPercentage = percentageCalculator(personalLoanAmt, totalPayment);
        let interestPercentage = percentageCalculator(totalInterest, totalPayment);
        setPrincipalPercentage(principalPercentage);
        setInterestPercentage(interestPercentage);
    }

    const handleStartMonthChange = (event) => {
        // console.log("handleStartMonthChange ==> ", event.target.value);
        setLoanStartDate(event.target.value);
    };

    const emiCalculator = (principal, rate, time) => {
        let emi;
        rate = rate / (12 * 100);
        emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
        // console.log("emi ---> ", emi.toFixed(2));
        return parseFloat(emi.toFixed(2));
    }

    const percentageCalculator = (number) => {
        number = parseInt(number);
        // console.log("Number ===========> ", number, "    TotalPayment ==============> ", totalPayment)
        let numberPercentage = (number / totalPayment) * 100;
        return (numberPercentage.toFixed(2));
    }
    // console.log("principal Percentage", principalPercentage);
    // console.log("interest Percentage", interestPercentage);

    // console.log(typeof personalLoanAmt);

   

    const generatePDF = () => {
        const element = document.getElementById('emiCalculator');
        const options = {
            filename: 'emi-slip.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(options).save();
    };

    return (<>
        <div id="emiCalculator" className={`container pt-5  ${styles.personalLoanContainer}`} >
            <h3 className='text-center fw-bold'>EMI Calculator</h3>
            <div className="row shadow pb-4">
                <div className="col-md-6 my-3">
                    <h5 className="text-center">Personal Loan Amount</h5>
                </div>
                <div className="col-md-6 my-3">
                    <input type="number" className="form-control w-75" name="personalLoneAmt" id="personalLoneAmt" placeholder="Enter Personal Loan Amount" defaultValue={personalLoanAmt} onChange={(event) => setPersonalLoanAmt(parseInt(event.target.value))} min={10000} />
                </div>
                <div className="col-md-6 my-3">
                    <h5 className="text-center">Interest Rate per Month</h5>
                </div>
                <div className="col-md-6 my-3">
                    <input type="number" className="form-control w-75" name="interestRate" id="interestRate" placeholder="Enter Interest Rate per Month" value={personalLoanInterest} onChange={(event) => setPersonalLoanInterest(parseInt(event.target.value))} min={5} />
                </div>
                <div className="col-md-6 my-3">
                    <h5 className="text-center">No. of Loan Tenure</h5>
                </div>
                <div className="col-md-6 my-3">
                    <input type="number" className="form-control w-75" name="loanTenure" id="loanTenure" placeholder="Enter Loan Tenure in Months" value={loanTenure} onChange={(event) => setLoanTenure(parseInt(event.target.value))} min={3} />
                </div>
                <div className="col-md-6 my-3 text-center">
                    {/* <button type="button" className='btn btn-md btn-primary w-25'>Calculate EMI</button> */}
                </div>
                <div className="col-md-6 my-3 ">
                    <button type="button" className='btn btn-md btn-primary w-25' onClick={handleSubmit}>Calculate EMI</button>
                </div>
            </div>
            <div className='row mt-5 shadow pb-2'>
                <div className='col-md-6'>
                    <div className='mb-3 p-3 border border-1'>
                        <h5 className='text-center fw-bold'>Loan EMI</h5>
                        <h4 className='text-center fw-bold'>Rs. {emiPerMonth}</h4>
                    </div>
                    <div className='mb-3 p-3 border border-1'>
                        <h5 className='text-center fw-bold'>Total Interest Payable</h5>
                        <h4 className='text-center fw-bold'>Rs. {totalInterest}</h4>
                    </div>
                    <div className='mb-3 p-3 border border-1'>
                        <h5 className='text-center fw-bold'>Total Payment</h5>
                        <h4 className='text-center fw-bold'>Rs. {totalPayment}</h4>
                    </div>
                </div>
                <div className='col-md-6 p-3 text-center pb-4 mb-4'>
                    <div className='mb-3 p-3 border border-1'>
                        <h5 className='text-center text-light fw-bold'>Break-up of Total Payment</h5>
                        <Piechart interest={interestPercentage} principal={principalPercentage} />
                    </div>
                </div>

            </div>
            <div className='row mt-5 p-3 justify-content-center border border-1 mx-3'>
                    <h4 className='text-center text-light fw-bold mt-2'>Schedule showing EMI payments starting from</h4>
                <div className='col-md-12 mx-auto mb-3 p-1  w-50'>
                    <label htmlFor="start">Start month:</label>
                    <input
                        type="month"
                        id="start"
                        name="start"
                        min="2024-05"
                        value={loanStartDate}
                        onChange={handleStartMonthChange}
                        className="form-control w-100"
                    />
                </div>
            </div>
            <div className='row mt-5 p-3 justify-content-center border border-1 mx-3'>
                <div className='col-md-12 mx-auto mb-3 p-5'>
                    <BarChartComponent loanAmt = {personalLoanAmt} interestRate={personalLoanInterest} loanTenure={loanTenure} loanEMI={emiPerMonth} loanStartDate={loanStartDate}/>
                </div>
                <div className='col-md-12 mx-auto mb-3 p-5 text-center'>
                    <h6 className='text-center'>Want to print OR share a custom link to your EMI calculation (with all your numbers pre-filled)?</h6>
                    <button type="button" className='btn btn-md btn-primary mx3 mt-2' onClick={generatePDF}>Save</button>
                    <button type="button" className='btn btn-md btn-primary mx-3 mt-2'>Share</button>
                </div>
            </div>
        </div>

    </>);
};
