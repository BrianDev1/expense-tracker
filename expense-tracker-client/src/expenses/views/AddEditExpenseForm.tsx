import React from "react";
import { Expense } from "../utils/types";
import { actions as expenseActions } from "../redux/model";
import { Form, Formik } from "formik";
import { Grid, InputLabel, TextField, Typography } from "@material-ui/core";
import CustomButton from "../components/CustomButton";
import * as Yup from "yup";
import { useButtonState } from "../redux/hooks";

interface IAddEditExpenseForm {
  readonly type: "Edit" | "Add";
  readonly editSubmit: typeof expenseActions.updateExpense.request;
  readonly createSubmit: typeof expenseActions.createExpense.request;
  readonly selectedExpense?: Expense;
}

/**
 * - Add or Edit Expense form
 * - Utilizing the power of formik
 */
const AddEditExpenseForm = ({
  selectedExpense,
  editSubmit,
  createSubmit,
  type,
}: IAddEditExpenseForm) => {
  const buttonState = useButtonState();
  /* Schema to validate input*/
  const expenseFormSchema = Yup.object().shape({
    description: Yup.string()
      .min(4, "Too Short!")
      .max(40, "Too Long!")
      .required("Required"),
    amount: Yup.number()
      .min(1, "Expense needs more than 0!")
      .required("Required"),
  });
  return (
    <Grid container justifyContent="center" style={{ height: "350px" }}>
      <Typography variant={"h5"}>
        {type === "Add" ? "Add Expense" : "Edit Expense"}
      </Typography>
      <Formik
        initialValues={
          selectedExpense
            ? selectedExpense
            : {
                id: undefined,
                description: "",
                amount: 0,
              }
        }
        validationSchema={expenseFormSchema}
        onSubmit={(values, actions) => {
          if (values.id && type === "Edit") {
            editSubmit({
              id: values.id,
              description: values.description,
              amount: values.amount,
            });
          } else {
            createSubmit({
              description: values.description,
              amount: values.amount,
            });
          }
        }}
      >
        {({ handleChange, values, errors, touched }) => (
          <Form>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={10} style={{ height: "100px" }}>
                <InputLabel htmlFor="description">
                  Expense Description
                </InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  required
                  id="description"
                  name="description"
                  onChange={handleChange}
                  placeholder="Enter description"
                  value={values.description}
                  error={
                    errors.description && touched.description ? true : undefined
                  }
                  helperText={errors.description}
                />
              </Grid>
              <Grid item xs={10} style={{ height: "100px" }}>
                <InputLabel htmlFor="amount">Amount</InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  required
                  id="amount"
                  name="amount"
                  placeholder="Enter amount"
                  type={"number"}
                  value={values.amount}
                  onChange={handleChange}
                  error={errors.amount && touched.amount ? true : false}
                  helperText={errors.amount}
                />
              </Grid>
              <Grid item xs={12} style={{ maxWidth: "150px" }}>
                <CustomButton
                  fullWidth
                  type="submit"
                  variant="Green"
                  onclick={() => null}
                  text={"Save"}
                  disabled={buttonState}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default AddEditExpenseForm;
