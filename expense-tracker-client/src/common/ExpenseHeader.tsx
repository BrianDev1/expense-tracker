import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Grid, Toolbar, Typography } from "@material-ui/core";

// Simple AppBar for completeness
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      height: "72px",
      backgroundColor: theme.palette.info.main,
    },
    toolBar: {
      height: "inherit",
    },
    h4: {
      color: theme.palette.common.white,
      fontWeight: "lighter",
    },
  })
);

/**
 * Custom AppBar
 */
const ExpenseHeader: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar position={"sticky"} className={classes.appBar}>
      <Toolbar disableGutters className={classes.toolBar}>
        <Grid container justifyContent="center">
          <Typography variant={"h4"}>My Tracker</Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default ExpenseHeader;
