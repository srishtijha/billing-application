import React, { useState } from 'react';
import './filter-section.css'

export default function FilterSection(props) {
    return (
        <div className="filter-section">
            <label>
                <div className="filter-section-label">
                    Select Category
                </div>
                <select
                    value={props.categoryFilter}
                    onChange={props.handleFilterChange}
                    className="filter-section-select">
                    <option value="default" disabled hidden>
                        Select category
                    </option>
                    {props.bills.map((bill) => <option value={bill.category}>{bill.category}</option>)}
                </select>
            </label>
            <div className="filter-section-button-container">
                <button
                    onClick={props.handleFilter}
                    className="button">
                    Filter
                </button>
                <button
                    onClick={props.handleCancelFilter}
                    className="button">
                    Cancel
                </button>
            </div>

        </div>
    )
}