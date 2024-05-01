import { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import styles from './emiCalculator.module.css';



export const EMI_Calculator = () => {
    let [personalLoanAmt, setPersonalLoanAmt] = useState(100000);
    let [personalLoanInterest, setPersonalLoanInterest] = useState(5);
    let [loanTenure, setLoanTenure] = useState(12);
    let [loanEMI, setLoanEMI] = useState(0);
    let [totalPayment, setTotalPayment] = useState(0);
    let [emiPerMonth, setEMIPerMonth] = useState(0);
    let [totalInterest, setTotalInterest] = useState(0);
    let [principlePercentage, setPrinciplePercentage] = useState(0);
    let [interestPercentage, setInterestPercentage] = useState(0);

    const handleSubmit = () => {
        let emiPerMonth = emiCalculator(personalLoanAmt, personalLoanInterest, loanTenure);
        setEMIPerMonth(emiPerMonth);

        console.log("totalAmt=======> ", (emiPerMonth * loanTenure));
        let totalPayment = (emiPerMonth * loanTenure);
        setTotalPayment(totalPayment);


        let totalInterest = totalPayment - personalLoanAmt;
        console.log("total Interest = ", totalInterest);
        setTotalInterest(totalInterest);

        let principlePercentage = percentageCalculator(personalLoanAmt);
        setPrinciplePercentage(principlePercentage);
        let interestPercentage = percentageCalculator(totalInterest);
        setInterestPercentage(interestPercentage);

    }

    const emiCalculator = (principle, rate, time) => {
        let emi;
        rate = rate / (12 * 100); // one month interest
        emi = (principle * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
        console.log("emi ---> ", emi.toFixed(2));
        return (emi.toFixed(2));
    }

    const percentageCalculator = (number) => {
        number = parseInt(number);
        let numberPercentage = (number / totalPayment) * 100;
        return (numberPercentage.toFixed(2));
    }


    console.log(typeof personalLoanAmt);

    return (<>
        <div className={`container mt-5 pt-5  ${styles.personalLoanContainer}`} >
            <h3 className='text-center fw-bold'>EMI Calculator</h3>
            <div className="row shadow pb-4">
                <div className="col-md-6 my-3">
                    <h5 className="text-center">Personal Loan Amount</h5>
                </div>
                <div className="col-md-6 my-3">
                    <input type="number" className="form-control w-75" name="personalLoneAmt" id="personalLoneAmt" placeholder="Enter Personal Loan Amount" value={personalLoanAmt} onChange={(event) => setPersonalLoanAmt(parseInt(event.target.value))} min={10000} />
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
            <div className='row mt-5'>
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
                    <h5 className='text-center fw-bold'>Break-up of Total Payment</h5>
                    <PieChart className='w-50'
                        data={[
                            { title: `Principle ${principlePercentage} %`, value: 15, color: '#E38627' },
                            { title: `Interest ${interestPercentage} %`, value: 10, color: '#C13C37' },
                        ]}
                        lineWidth={50}

                    />;


                </div>
            </div>
            <div className='row'>
                {/* <label for="customRange3" className="form-label">Example range</label>
                <input type="range" className="form-range form-range-track-bg-danger" min="0" max="30" step="5" id="customRange3" /> */}
            </div>
        </div>
    </>);
};
