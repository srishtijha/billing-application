import React, { useState } from 'react';
import './add-bill-section.css'

export default function AddBillsSection(props) {
    const [id, setId] = useState(null);
    const [description, setDescription] = useState(null);
    const [category, setCategory] = useState(null);
    const [amount, setAmount] = useState(null);
    const [date, setDate] = useState(null);

    const resetAddBills = () => {
        setId(undefined);
        setDescription(undefined);
        setCategory(undefined);
        setAmount(undefined);
        setDate(undefined);
        props.onClose();
    }

    const handleChange = (e) => {
        switch (e.target.id) {
            case "billing-id": setId(e.target.value);
                break;
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

    const handleAddBill = () => {
        props.addBill(
            {
                id,
                description,
                category,
                amount,
                date
            }
        );
        resetAddBills();
    }

    return (
        <div className="add-bill-section">
            <div className="add-bill-heading">
                Add Bill
            </div>

            <div className="add-bill-input-container">
                <label>
                    <div className="input-label">ID:</div>
                    <input type="text" id="billing-id" value={id} onChange={handleChange} />
                </label>
                <label>
                    <div className="input-label">Description:</div>
                    <input type="text" id="description" value={description} onChange={handleChange} />
                </label>
                <label>
                    <div className="input-label">Category:</div>
                    <input type="text" id="category" value={category} onChange={handleChange} />
                </label>
                <label>
                    <div className="input-label">Amount:</div>
                    <input type="text" id="amount" value={amount} onChange={handleChange} />
                </label>
                <label>
                    <div className="input-label">Date:</div>
                    <input type="text" id="date" value={date} onChange={handleChange} />
                </label>
            </div>
            <div className="add-bill-button-container">
                <button
                    className="button"
                    onClick={handleAddBill}>
                    Add
                </button>
                <button
                    className="button"
                    onClick={resetAddBills}>
                    Cancel
            </button>
            </div>

        </div>
    )
}