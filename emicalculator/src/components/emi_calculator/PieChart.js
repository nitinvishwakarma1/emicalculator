import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import styles from './emiCalculator.module.css';

function Piechart(props) {
    let seriesValue = (props.interest && props.principal) ? [parseFloat(props.interest), parseFloat(props.principal)] : [2.7,97.3];
    //    const [stdudentSubject, setStudentsubject]= useState([]);
    //    const [studentMarks, setStudentMarks]= useState([]);

    //    useEffect( ()=>{
    //        const sSubject=[];
    //        const sMarks=[];
    //        const getStudentdata= async()=>{
    //        const reqData= await fetch("http://localhost/reactgraphtutorial/marks");
    //        const resData= await reqData.json();       
    //        for(let i=0; i< resData.length; i++)
    //        {
    //         sSubject.push(resData[i].subject);
    //         sMarks.push(parseInt(resData[i].marks));
    //        }
    //        setStudentsubject(sSubject);
    //        setStudentMarks(sMarks);
    //         //console.log(resData); 
    //        }

    //     getStudentdata();

    //    },[]);
    console.log(props.interest);

    return (
        <React.Fragment>
            <div className="container-fluid mb-3 text-center">
                <Chart
                    type="pie"
                    width={360}
                    height={360}
                    series={seriesValue}
                    options={{
                        colors: ["#ED8C2B", "#88A825"],
                        labels: ['Interest', 'Principal'],
                        chart: {
                            foreColor: '#FFFFFF'
                        }

                    }}
                >
                </Chart>
            </div>
        </React.Fragment>
    );
}
export default Piechart;