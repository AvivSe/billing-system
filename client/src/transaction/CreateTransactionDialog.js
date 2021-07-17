import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import { Formik } from "formik";
import "./CreateTransactionDialog.scss";
import { Autocomplete } from "@material-ui/lab";
import { createTransaction, updateTransaction as _updateTransaction} from "../api/transactions";
import { useState } from "react";

export default function CreateTransactionDialog({ open, onClose, customers, onMutation, updateTransaction }) {
  const [error, setError] = useState(undefined);
  const creationMode = !updateTransaction;

  return <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">{creationMode ? "New Transaction" : `Update Transaction`}
      {!creationMode && <span style={{fontSize: 16, marginLeft: 20}}># {updateTransaction.id}</span>}
    </DialogTitle>

    <DialogContent>
      <Formik
        initialValues={updateTransaction || {}}
        onSubmit={values => {
          if (creationMode) {
            createTransaction(values).then(onMutation).catch(setError);
          } else {
            _updateTransaction(values).then(onMutation).catch(setError);
          }
        }
        }>
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
            /* and other goodies */
          }) => (<form onSubmit={handleSubmit} className={"formDialog"}>
          <Autocomplete
            id="customerId"
            options={Object.values(customers)}
            getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
            value={values.customer}
            style={{ width: 500 }}
            onChange={(e, value) => setFieldValue("customerId", value?.id)}
            renderInput={(params) => <TextField {...params} label="Customer" variant="outlined" />}
          />
          <TextField variant={"outlined"} id="totalPrice" label="Price" margin={"dense"} value={values.totalPrice}
                     onChange={handleChange} />
          <TextField variant={"outlined"} id="currency" label="Currency" margin={"dense"} value={values.currency}
                     onChange={handleChange} />
          <TextField variant={"outlined"} id="creditCardType" label="Credit CardT ype" margin={"dense"}
                     value={values.creditCardType} onChange={handleChange} />
          <TextField variant={"outlined"} id="creditCardNumber" label="Credit Card Number" margin={"dense"}
                     value={values.creditCardNumber} onChange={handleChange} />
          <DialogActions>
            {error && <div style={{ color: "red", fontWeight: "bolder" }}>
              {error.message}
            </div>}
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>)}
      </Formik>
    </DialogContent>

  </Dialog>;
}
