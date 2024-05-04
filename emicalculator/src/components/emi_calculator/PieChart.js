import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import styles from './emiCalculator.module.css';

function Piechart(props) {
    let seriesValue = (props.interest && props.principal) ? [parseFloat(props.interest), parseFloat(props.principal)] : [2.7,97.3];
  
    // console.log(props.interest);

    return (<>
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
        </>);
}
export default Piechart;