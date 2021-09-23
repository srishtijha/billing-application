import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import './monthly-billing-cycle.css';

export default function MonthlyBillingCycle(props) {
    const sortedBills = props.bills.slice().sort((a, b) => {
        const aDate = new Date(moment(a.date).format("DD-MM-YYYY")).getTime();
        const bDate = new Date(moment(b.date).format("DD-MM-YYYY")).getTime();
        return aDate - bDate;
    });

    const data = sortedBills.map((elem) => {
        const date = new Date(moment(elem.date).format("DD-MM-YY"));
        const year = date.getFullYear();
        const day = date.getDate();
        const month = date.getMonth();
        return [Date.UTC(year, month, day), parseInt(elem.amount, 10)]
    })

    const options = {
        title: {
            text: 'Billing cycle',
            style: {
                "font-size": "24px",
                "font-weight": "bold", "font-family": "'Courier New', Courier, monospace"
            }
        },
        series: [{
            name: "Bill amount",
            data
        }],
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Amount (Rs)'
            },
            min: 0
        }
    }
    return (
        <div className="monthly-billing-cycle">
            <div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
            <div className="monthly-billing-cycle-button-container">
                <button
                    onClick={props.onClose}
                    className="button">
                    Cancel
                </button>
            </div>
        </div>
    )
}