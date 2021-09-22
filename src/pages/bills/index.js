import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addBill,
    selectBills,
} from '../../redux/bills/billsSlice';
import styles from './Bills.module.css';
import Table from './components/bills-table/index';

export function Bills() {
    const bills = useSelector(selectBills);
    const dispatch = useDispatch();
    const [data, setData] = useState(bills);
    const [showAddBillModal, setShowAddBillModal] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState(undefined);
    // const [applyFilter, setApplyFilter] = useState(false)
    const [id, setId] = useState(null)
    const [description, setDescription] = useState(null)
    const [category, setCategory] = useState(null)
    const [amount, setAmount] = useState(null)
    const [date, setDate] = useState(null)

    React.useEffect(() => {
        setData(bills)
    }, [bills])

    // React.useEffect(() => {
    //     if (categoryFilter) {
    //         console.log("Here", categoryFilter)
    //         setData(bills.filter((bill) => bill.category === categoryFilter))
    //     } else {
    //         setData(bills)
    //     }
    // }, [applyFilter])

    console.log("Bills", bills)

    const handleChange = (e) => {
        // setApplyFilter(false)
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

    const constructBill = () => {
        return {
            id,
            description,
            category,
            amount,
            date
        }
    }

    const renderAddBillModal = () => {
        return (
            <div>
                Add Bill
                <label>
                    ID:
                <input type="text" id="billing-id" value={id} onChange={handleChange} />
                </label>
                <label>
                    Description:
                <input type="text" id="description" value={description} onChange={handleChange} />
                </label>
                <label>
                    Category:
                <input type="text" id="category" value={category} onChange={handleChange} />
                </label>
                <label>
                    Amount:
                <input type="text" id="amount" value={amount} onChange={handleChange} />
                </label>
                <label>
                    Date:
                <input type="text" id="date" value={date} onChange={handleChange} />
                </label>
                <button
                    onClick={() => dispatch(addBill(constructBill()))}>
                    Add
                </button>
                <button
                    onClick={() => setShowAddBillModal(false)}>
                    Cancel
                </button>

            </div>
        )
    }

    const handleFilterChange = (e) => {
        setCategoryFilter(e.target.value)
    }

    const handleCancelFilter = () => {
        setShowFilter(false)
        setCategoryFilter(undefined)
        setData(bills)
    }

    const handleFilter = () => {
        if (categoryFilter) {
            console.log("Here", categoryFilter)
            setData(bills.filter((bill) => bill.category === categoryFilter))
        }
    }

    const renderFilter = () => {
        // const filterValues = bills.map(bill => bill.category);
        return (
            <div>
                <label>
                    Select Category
                <select value={categoryFilter} onChange={handleFilterChange}>
                        {bills.map((bill) => <option value={bill.category}>{bill.category}</option>)}
                    </select>
                </label>
                <button
                    onClick={handleFilter}>
                    Filter
                </button>
                <button
                    onClick={handleCancelFilter}>
                    Cancel
                </button>
            </div>

        )
    }

    // console.log("STATE VALUE:", bills)
    const columns = [
        {
            Header: 'Billing Id',
            accessor: 'id'
        },
        {
            Header: 'Description',
            accessor: 'description'
        },
        {
            Header: 'Category',
            accessor: 'category'
        },
        {
            Header: 'Amount',
            accessor: 'amount'
        },
        {
            Header: 'Date',
            accessor: 'date'
        },
    ]

    return (
        <div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    // onClick={() => dispatch(addBill(dummy))}
                    onClick={() => setShowAddBillModal(true)}>
                    Add bill
                </button>
                <button
                    className={styles.button}
                    // onClick={() => dispatch(addBill(dummy))}
                    onClick={() => setShowFilter(true)}>
                    Filter
                </button>
            </div>
            {showAddBillModal && renderAddBillModal()}
            {showFilter && renderFilter()}
            <Table
                columns={columns}
                rows={data} />
        </div>
    );
}