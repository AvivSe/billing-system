import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import CreateIcon from "@material-ui/icons/Create";
import { deleteCustomer, getCustomers } from "../api/customers";
import CreateCustomerDialog from "./CreateCustomerDialog";

export default function Customers() {
  const [customers, setCustomers] = useState({});
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [updateCustomer, setUpdateCustomer] = useState(undefined);

  useEffect(function() {
    setError(undefined);
    setLoading(true);
    getCustomers().then(data => {
      const customers = data.reduce(function(prev, curr) {
        prev[curr.id] = curr;
        return prev;
      }, {});
      setCustomers(customers);
    }).catch(error => {
      setError(error.message);
    }).finally(() => setLoading(false));
  }, []);

  function handleUpsertCustomer(customer) {
    setCustomers(prev => {
      delete prev[customer.id];
      return {
        [customer.id]: customer,
        ...prev
      };
    });
    setOpenCreateDialog(false);
    setUpdateCustomer(undefined);
  }

  function handleDeleteCustomer(id) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure?")) {
      deleteCustomer(id).then(function() {
        setCustomers(prev => {
          delete prev[id];
          return { ...prev };
        });
      });
    }
  }

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div className={"gridWrapper"}>
    <header>
      <h2>Customers</h2>
      <div>
        <Button style={{ marginBottom: 16, marginRight: 16 }} color={"primary"} variant={"contained"}
                onClick={() => setOpenCreateDialog(true)}>
          NEW CUSTOMER</Button>
        <Button style={{ marginBottom: 16 }} color={"secondary"} variant={"contained"}
                href={"/"}>TRANSACTIONS</Button>
      </div>
    </header>
    <div className={"grid"}>
      <DataGrid
        columns={[
          {
            field: "id",
            headerName: "#",
            width: 360,
            hide: true
          },
          {
            field: "firstName",
            headerName: "First Name",
            width: 200
          },
          {
            field: "lastName",
            headerName: "Last Name",
            width: 200
          },
          {
            field: "email",
            headerName: "Email",
            width: 140
          },
          {
            field: "gender",
            headerName: "Gender",
            width: 200
          },
          {
            field: "country",
            headerName: "Country",
            width: 200
          },
          {
            field: "city",
            headerName: "City",
            width: 120
          },
          {
            field: "street",
            headerName: "Street",
            width: 120
          },
          {
            field: "phone",
            headerName: "Phone",
            width: 120
          },
          {
            field: "",
            headerName: "",
            width: 120,
            renderCell: function(params) {
              return <>
                <IconButton onClick={() => handleDeleteCustomer(params.row.id)}
                            variant="contained"><DeleteIcon /></IconButton>
                <IconButton onClick={() => {
                  setUpdateCustomer(params.row);
                }}
                            variant="contained"><CreateIcon /></IconButton>
              </>;
            }
          }
        ]}
        rows={Object.values(customers)}
      />
    </div>

    <CreateCustomerDialog
      updateCustomer={updateCustomer}
      onMutation={handleUpsertCustomer}
      open={openCreateDialog || !!updateCustomer}
      onClose={
        function() {
          setUpdateCustomer(undefined);
          setOpenCreateDialog(false);
        }
      }
    />
  </div>;

}
