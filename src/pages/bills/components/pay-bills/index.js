import React, { useState } from 'react';
import './pay-bills.css'

export default function FilterSection(props) {
    const [budget, setBudget] = useState(0);
    const handleInputChange = (e) => {
        setBudget(e.target.value)
    }

    const checkPayableBills = () => {
        props.checkPayableBills(budget)
    }
    return (
        <div className="pay-bills">
            <div className="pay-bills-label">
                Enter Budget:
                </div>
            <input type="text" value={budget} onChange={handleInputChange} />
            <div className="pay-bills-label">
                Bills to be payed: {props.billsToBePayed}
            </div>

            <div className="pay-bills-button-container">
                <button
                    onClick={checkPayableBills}
                    className="button">
                    Check payable bills
                </button>
                <button
                    onClick={props.onClose}
                    className="button">
                    Cancel
                </button>
            </div>
        </div>
    )
}