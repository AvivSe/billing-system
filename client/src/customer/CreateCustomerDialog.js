import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, FormControl, InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import "./CreateCustomersDialog.scss";
import { useState } from "react";
import { Formik } from "formik";
import { createCustomer, updateCustomer as _updateCustomer } from "../api/customers";

export default function CreateCustomerDialog({ open, onClose, onMutation, updateCustomer }) {
  const [error, setError] = useState(undefined);
  const creationMode = !updateCustomer;
  console.log("updateCustomer",updateCustomer);
  return <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">{creationMode ? "New Customer" : `Update Customer`}
      {!creationMode && <span style={{ fontSize: 16, marginLeft: 20 }}># {updateCustomer.id}</span>}
    </DialogTitle>
    <DialogContent>
      <Formik
        initialValues={updateCustomer || {}}
        onSubmit={values => {
          if (creationMode) {
            createCustomer(values).then(onMutation).catch(setError)
          } else {
            _updateCustomer(values).then(onMutation).catch(setError)
          }
        }
        }>
        {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue
          }) => (<form onSubmit={handleSubmit} className={"formDialog"}>
          <TextField variant={"outlined"} id="firstName" label="First name" margin={"dense"} value={values.firstName}
                     onChange={handleChange} />
          <TextField variant={"outlined"} id="lastName" label="Last name" margin={"dense"} value={values.lastName}
                     onChange={handleChange} />
          <TextField variant={"outlined"} id="email" label="Email" margin={"dense"} value={values.email}
                     onChange={handleChange} />
          <FormControl className="MuiTextField-root" variant="outlined">
            <InputLabel htmlFor="gender">Age</InputLabel>
            <Select className="select-input" margin="dense" variant={"outlined"} value={values.gender} id="gender"
                    onChange={(e) => setFieldValue("gender", e.target.value)}>
              <MenuItem value={0}>Male</MenuItem>
              <MenuItem value={1}>Female</MenuItem>
              <MenuItem value={2}>Bi</MenuItem>
            </Select>
          </FormControl>
          <TextField variant={"outlined"} id="country" label="Country" margin={"dense"} value={values.country}
                     onChange={handleChange} />
          <TextField variant={"outlined"} id="city" label="City" margin={"dense"} value={values.city}
                     onChange={handleChange} />
          <TextField variant={"outlined"} id="street" label="Street" margin={"dense"} value={values.street}
                     onChange={handleChange} />
          <TextField variant={"outlined"} id="phone" label="Phone" margin={"dense"} value={values.phone}
                     onChange={handleChange} />
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
