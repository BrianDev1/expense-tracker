import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
import { Expense } from "../utils/types";
import CustomButton from "../../common/components/CustomButton";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
    },
    margin: {
      margin: theme.spacing(1, 0),
    },
    h1: {},
    buttonCtn: {
      maxWidth: theme.spacing(25),
      maxHeight: theme.spacing(6),
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
      <Grid container item xs={12} className={classes.margin}>
        <Typography variant="h4">Expense Tracker</Typography>
      </Grid>
      <Grid container justifyContent="space-between" className={classes.margin}>
        <Grid container item xs={8} spacing={1}>
          <Grid item xs={12}>
            <Typography>{`The Sub-total of expenses is $${100}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{`The Total with taxes is $${100} `}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={4} className={classes.buttonCtn}>
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
        className={clsx(classes.root, classes.margin)}
      >
        <Grid item sm={6} md={3}>
          <Typography>Description</Typography>
        </Grid>
        <Grid item sm={6} md={2}>
          <Typography>Amount</Typography>
        </Grid>
        <Grid item sm={6} md={2}>
          <Typography>Taxes(15%)</Typography>
        </Grid>
        <Grid item sm={6} md={2}>
          <Typography>Date</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExpenseTracker;
