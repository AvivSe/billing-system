import { useEffect, useState } from "react";
import { deleteTransaction, getTransactions } from "../api/transactions";
import { DataGrid } from "@material-ui/data-grid";
import { Button, IconButton } from "@material-ui/core";
import CreateTransactionDialog from "./CreateTransactionDialog";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import CreateIcon from "@material-ui/icons/Create";

export default function Transactions() {
  const [transactions, setTransactions] = useState({});
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [updateTransaction, setUpdateTransaction] = useState(undefined);

  useEffect(function() {
    setError(undefined);
    setLoading(true);
    getTransactions().then(data => {
      const transactions = data.reduce(function(prev, curr) {
        prev[curr.id] = curr;
        return prev;
      }, {});
      setTransactions(transactions);
    }).catch(error => {
      setError(error.message);
    }).finally(() => setLoading(false));
  }, []);

  function handleUpsertTransaction(transaction) {
    setTransactions(prev => {
      delete prev[transaction.id];
      return {
        [transaction.id]: transaction,
        ...prev
      };
    });
    setOpenCreateDialog(false);
    setUpdateTransaction(false);
  }

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function handleDeleteTransaction(id) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure?")) {
      deleteTransaction(id).then(function() {
        setTransactions(prev => {
          delete prev[id];
          return { ...prev };
        });
      });
    }
  }

  return <div className={"gridWrapper"}>
    <header>
      <h2> Transactions </h2>
      <div>
        <Button style={{marginBottom: 16, marginRight: 16}} color={"primary"} variant={"contained"} onClick={() => setOpenCreateDialog(true)}>
          NEW TRANSACTION</Button>
        <Button style={{marginBottom: 16}} color={"secondary"} variant={"contained"} href={'/customers'}>CUSTOMERS</Button>
      </div>
    </header>
    <div className={"grid"}>
      <DataGrid
        columns={[
          {
            field: "id",
            headerName: "#",
            width: 360
          },
          {
            field: "customerName",
            headerName: "Customer",
            width: 200,
            valueGetter: ({ row }) => `${row.customer.firstName} ${row.customer.lastName}`
          },
          {
            field: "currency",
            headerName: "Currency",
            width: 140
          },
          {
            field: "creditCardType",
            headerName: "Credit Card Type",
            width: 200
          },
          {
            field: "creditCardNumber",
            headerName: "Credit Card",
            width: 200
          },
          {
            field: "totalPrice",
            headerName: "Price",
            width: 120
          },
          {
            field: "",
            headerName: "",
            width: 120,
            renderCell: function(params) {
              return <>
                <IconButton onClick={() => handleDeleteTransaction(params.row.id)}
                            variant="contained"><DeleteIcon /></IconButton>
                <IconButton onClick={() => {
                  setUpdateTransaction(params.row);
                }}
                            variant="contained"><CreateIcon /></IconButton>
              </>;
            }
          }
        ]}
        rows={Object.values(transactions)}
      />
    </div>

    <CreateTransactionDialog
      updateTransaction={updateTransaction}
      onMutation={handleUpsertTransaction}
      open={openCreateDialog || !!updateTransaction}
      onClose={() => {
        setUpdateTransaction(undefined);
        setOpenCreateDialog(false);
      }
      }
      customers={Object.values(transactions).map(({ customer }) => customer).reduce(function(prev, curr) {
        prev[curr.id] = curr;
        return prev;
      }, {})} />
  </div>;

}
