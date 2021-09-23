import React, { useState } from 'react';
import './bills-table.css'
import { AiTwotoneEdit, AiOutlineCloseCircle } from "react-icons/ai";

export default function Table(props) {
    const [edit, setEditRow] = useState(undefined)
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState(null);
    const [amount, setAmount] = useState(null);
    const [date, setDate] = useState(null);
    const tableColumns = (
        <tr className="table-header">
            {props.columns.map(col =>
                <th>{col.Header}</th>)}
        </tr>
    )

    React.useEffect(() => {
        if (edit) {
            const selectedRow = props.rows.find(elem => elem.id == edit)
            setDescription(selectedRow.description)
            setCategory(selectedRow.category)
            setAmount(selectedRow.amount)
            setDate(selectedRow.date)
        }

    }, [edit])

    const handleSelection = (e) => {
        setEditRow(e.target.id);
        props.updateBill(e.target.id)
    }

    const handleEdit = (e) => {
        switch (e.target.id) {
            case "description": setDescription(e.target.value);
                break;
            case "category": setCategory(e.target.value);
                break;
            case "amount": setAmount(e.target.value);
                break;
            case "date": setDate(e.target.value);
                break;
        }
    }

    const handleSaveClick = (e) => {
        props.updateBill(edit, {
            edit,
            description,
            category,
            amount,
            date
        });
        setEditRow(undefined)
    }

    const handleCancelClick = (e) => {
        setEditRow(undefined)
    }

    const handleDelete = (e) => {
        props.deleteBill(e.target.id);
    }

    const tableRows = props.rows.map((dataItem) => {
        if (edit == dataItem.id) {
            return (
                <tr key={dataItem.id} id={dataItem.id}>
                    <td id={dataItem.id}><button onClick={handleSaveClick} className="button">Save</button></td>
                    <td id={dataItem.id}>{dataItem.id}</td>
                    <td id={dataItem.id}><input id="description" value={description || ''} onChange={handleEdit} /></td>
                    <td id={dataItem.id}><input id="category" value={category || ''} onChange={handleEdit} /></td>
                    <td id={dataItem.id}><input id="amount" value={amount | ''} onChange={handleEdit} /></td>
                    <td id={dataItem.id}><input id="date" value={date || ''} onChange={handleEdit} /></td>
                    <td id={dataItem.id}><button onClick={handleCancelClick} className="button">Cancel</button></td>
                </tr>
            )
        }
        return (
            <tr key={dataItem.id} id={dataItem.id}>
                <td id={dataItem.id}><AiTwotoneEdit className="icon" id={dataItem.id} onClick={handleSelection} /></td>
                <td id={dataItem.id}>{dataItem.id}</td>
                <td id={dataItem.id}>{dataItem.description}</td>
                <td id={dataItem.id}>{dataItem.category}</td>
                <td id={dataItem.id}>{dataItem.amount}</td>
                <td id={dataItem.id}>{dataItem.date}</td>
                <td id={dataItem.id}><AiOutlineCloseCircle className="icon" id={dataItem.id} onClick={handleDelete} /></td>
            </tr>
        )
    })

    return (

        <div className="table-container" >
            <table className="bills-table">
                <tbody>
                    {tableColumns}
                    {tableRows}
                </tbody>
            </table>
        </div >
    );
}