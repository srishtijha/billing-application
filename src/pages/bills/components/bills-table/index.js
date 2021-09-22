import React, { useState } from 'react';

export default function Table(props) {
    // console.log("This table")
    const tableColumns = (
        <tr>
            {props.columns.map(col =>
                <th>{col.Header}</th>)}
        </tr>
    )
    const tableRows = props.rows.map((dataItem) => {
        return (
            <tr>
                <td>{dataItem.id}</td>
                <td>{dataItem.description}</td>
                <td>{dataItem.category}</td>
                <td>{dataItem.amount}</td>
                <td>{dataItem.date}</td>
            </tr>
        )
    })

    return (
        <div>
            <table id="simple-board">
                <tbody>
                    {tableColumns}
                    {tableRows}
                </tbody>
            </table>
        </div>
    );
}