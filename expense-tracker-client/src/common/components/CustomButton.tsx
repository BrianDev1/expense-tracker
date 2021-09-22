import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonMain: {
      borderRadius: theme.spacing(0.5),
    },
    greenVariant: {
      backgroundColor: theme.palette.success.light,
    },
    yellowVariant: {
      backgroundColor: theme.palette.warning.light,
    },
    redVariant: {
      backgroundColor: theme.palette.error.light,
    },
    whiteText: {
      color: theme.palette.common.white,
    },
    blackText: {
      color: theme.palette.common.black,
    },
  })
);

interface ICustomButton {
  readonly text: String;
  readonly onclick: () => void;
  readonly variant: "Green" | "Yellow" | "Red";
  readonly fullWidth?: boolean;
  readonly disabled?: boolean;
}

const CustomButton = ({
  text,
  onclick,
  variant,
  fullWidth,
  disabled,
}: ICustomButton) => {
  const classes = useStyles();
  return (
    <Button
      variant={"contained"}
      className={clsx(classes.buttonMain, {
        [classes.greenVariant]: variant === "Green",
        [classes.whiteText]: variant === "Green" || variant === "Red",
        [classes.redVariant]: variant === "Red",
        [classes.yellowVariant]: variant === "Yellow",
      })}
      onClick={onclick}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
