import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import { Expense } from "../utils/types";
import CustomButton from "../../common/components/CustomButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
    },
    buttonCtn: {
      width: theme.spacing(10),
    },
  })
);

interface IExpenseTracker {
  readonly expenses: readonly Expense[];
}

const ExpenseTracker = ({ expenses }: IExpenseTracker) => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <Grid container item xs={12}>
        <Typography variant="h4">Expense Tracker</Typography>
      </Grid>

      <Grid container item xs={8}>
        <Grid item xs={12}>
          <Typography>{`The Sub-total of expenses is $${100}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{`The Total with taxes is $${100} `}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item className={classes.buttonCtn}>
          <CustomButton
            onclick={() => console.log("Clicked")}
            variant={"Green"}
            text={"Add new expense"}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="flex-start"
        alignItems={"center"}
        className={classes.root}
      >
        <Grid item xs={6} lg={2}>
          <Typography>Description</Typography>
        </Grid>
        <Grid item xs={6} lg={2}>
          <Typography>Amount</Typography>
        </Grid>
        <Grid item xs={6} lg={2}>
          <Typography>Taxes(15%)</Typography>
        </Grid>
        <Grid item xs={6} lg={2}>
          <Typography>Date</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpenseTracker;
