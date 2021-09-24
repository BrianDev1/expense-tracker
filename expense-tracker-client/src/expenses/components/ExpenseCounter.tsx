import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import CustomButton from "../components/CustomButton";
import { actions as modalActions } from "../../modal/redux/model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1, 0),
    },
    buttonCtn: {
      maxWidth: theme.spacing(25),
      maxHeight: theme.spacing(6),
    },
  })
);

interface IExpenseCounter {
  readonly addNewExpense: typeof modalActions.openAddNewExpense;
  readonly subTotal: number;
  readonly total: number;
}

const ExpenseCounter = ({
  addNewExpense,
  subTotal,
  total,
}: IExpenseCounter) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="space-between" className={classes.margin}>
      <Grid container item xs={7} sm={8} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="caption">{`The Sub-total of expenses is $${subTotal.toFixed(
            2
          )}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption">{`The Total with taxes is $${total.toFixed(
            2
          )}`}</Typography>
        </Grid>
      </Grid>
      <Grid container item xs={5} sm={4} className={classes.buttonCtn}>
        <CustomButton
          onclick={addNewExpense}
          variant={"Green"}
          text={"Add new expense"}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default ExpenseCounter;
