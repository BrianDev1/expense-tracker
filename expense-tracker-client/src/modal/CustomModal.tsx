import { Dialog } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { actions as modalActions } from "./redux/model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "700px",
      margin: "auto",
    },
  })
);

interface IModal {
  readonly children: React.ReactNode;
  readonly type: "Dialog" | "Drawer";
  readonly open: boolean;
}

const CustomModal = (props: React.PropsWithChildren<IModal>) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const closeModal = compose(dispatch, modalActions.closeModal);
  return (
    <Dialog
      onClose={closeModal}
      open={props.open}
      maxWidth={"lg"}
      className={classes.root}
    >
      {props.children}
    </Dialog>
  );
};

export default CustomModal;
