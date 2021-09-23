import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addBill,
    updateBills,
    deleteBills,
    selectBills,
} from '../../redux/bills/billsSlice';
import styles from './Bills.module.css';
import Table from './components/bills-table/index';
import AddBillsSection from './components/add-bills-section/index';
import FilterSection from './components/filter-section/index';
import MonthlyBillingCycle from './components/monthly-billing-cycle/index';
import PayBills from './components/pay-bills/index';

export function Bills() {
    const bills = useSelector(selectBills);
    const dispatch = useDispatch();
    const [data, setData] = useState(bills);
    const [showAddBillModal, setShowAddBillModal] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState("default");
    const [showMonthlyBillingCycle, setMonthlyBillingCycle] = useState(false);
    const [showPayBills, setShowPayBills] = useState(false);
    const [billsToBePayedCount, setBillsToBePayedCount] = useState(0);

    React.useEffect(() => {
        setData(bills)
    }, [bills])

    const handleFilterChange = (e) => {
        setCategoryFilter(e.target.value)
    }

    const handleCancelFilter = () => {
        setShowFilter(false)
        setCategoryFilter(undefined)
        setData(bills)
        setCategoryFilter("default");
    }

    const handleFilter = () => {
        if (categoryFilter && categoryFilter !== "default") {
            setData(bills.filter((bill) => bill.category === categoryFilter))
        }
    }

    const columns = [
        {
            Header: "",
            accessor: "editOption"
        },
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
        }, {
            Header: "",
            accessor: "deleteOption"
        }
    ]

    const onAddBill = (billData) => {
        dispatch(addBill(billData));
        setShowAddBillModal(false);
    }

    const closeAddBillSection = () => setShowAddBillModal(false);

    const updateBill = (id, updatedBill) => {
        dispatch(updateBills({ id, updatedBill }));
    }

    const deleteBill = (id, updatedBill) => {
        dispatch(deleteBills(id));
    }

    const closeMonthlyBillingSection = () => setMonthlyBillingCycle(false);
    const totalBillAmount = bills.reduce((accumulator, elem) => {
        return accumulator + parseInt(elem.amount, 10);
    }, 0);

    const closePayBills = () => {
        setShowPayBills(false)
        setData(bills)
        setBillsToBePayedCount(0)
    };

    const onAddBtnClick = () => {
        setShowAddBillModal(true)
        setShowFilter(false)
        setMonthlyBillingCycle(false)
        setCategoryFilter("default");
        setShowPayBills(false)
    }

    const onFilterClick = () => {
        setShowFilter(true)
        setShowAddBillModal(false)
        setShowPayBills(false)
        setMonthlyBillingCycle(false)
    }

    const onBillingCycleClick = () => {
        setMonthlyBillingCycle(true)
        setShowAddBillModal(false)
        setShowFilter(false)
        setShowPayBills(false)
        setCategoryFilter("default");
    }

    const onPayBillsClick = () => {
        setShowPayBills(true)
        setMonthlyBillingCycle(false)
        setShowAddBillModal(false)
        setShowFilter(false)
        setCategoryFilter("default");

    }

    const checkPayableBills = (budget) => {
        const sortedBills = bills.slice().sort((a, b) => b.amount - a.amount);
        let amountRemaining = parseInt(budget, 10);
        let count = 0;
        const listOfBillsToBePayed = [];
        sortedBills.forEach((bill) => {
            if (parseInt(bill.amount, 10) <= amountRemaining) {
                amountRemaining -= parseInt(bill.amount, 10);
                count++;
                listOfBillsToBePayed.push(bill);
            }
        })

        setBillsToBePayedCount(count);
        setData(listOfBillsToBePayed);

    }

    return (
        <div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    onClick={onAddBtnClick}>
                    Add bill
                </button>
                <button
                    className={styles.button}
                    onClick={onFilterClick}>
                    Filter
                </button>
                <button
                    className={styles.button}
                    onClick={onBillingCycleClick}>
                    Billing Cycle
                </button>
                <button
                    className={styles.button}
                    onClick={onPayBillsClick}>
                    Pay bills
                </button>
            </div>

            <div className={styles.row}>
                <div className={styles.total}>
                    Total Amount: <span className={styles.amount}>{"Rs." + totalBillAmount}</span>
                </div>
            </div>

            {showAddBillModal && <AddBillsSection
                addBill={onAddBill}
                onClose={closeAddBillSection} />}
            {showFilter && <FilterSection
                bills={bills}
                categoryFilter={categoryFilter}
                handleFilter={handleFilter}
                handleCancelFilter={handleCancelFilter}
                handleFilterChange={handleFilterChange} />}
            {showMonthlyBillingCycle && <MonthlyBillingCycle
                bills={bills}
                onClose={closeMonthlyBillingSection} />}
            {showPayBills && <PayBills
                bills={bills}
                onClose={closePayBills}
                checkPayableBills={checkPayableBills}
                billsToBePayed={billsToBePayedCount} />}
            <Table
                columns={columns}
                rows={data}
                updateBill={updateBill}
                deleteBill={deleteBill} />
        </div>
    );
}