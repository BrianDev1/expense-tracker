import { Container, Grid } from "@material-ui/core";
import React from "react";

interface IAppContainer {
  children?: React.ReactNode;
}

const AppContainer = (props: React.PropsWithChildren<IAppContainer>) => {
  return (
    <Container maxWidth="lg">
      <Grid style={{ marginTop: "30px" }}>{props.children}</Grid>
    </Container>
  );
};

export default AppContainer;
