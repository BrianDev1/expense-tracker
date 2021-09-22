import { Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flex: 1,
    },
  })
);

interface IErrorPage {
  readonly code: string;
  readonly message: string;
}

const ErrorPage = ({ code, message }: IErrorPage) => {
  return (
    <Grid container justifyContent="center" spacing={4}>
      <Grid item xs={12}>
        <Typography variant={"h2"}>{`Error ${code}`}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={"h5"}>{`${message}`}</Typography>
      </Grid>
    </Grid>
  );
};

export default ErrorPage;
