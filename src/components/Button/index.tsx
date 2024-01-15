import React, { forwardRef } from "react";

import clsx from "clsx";
import * as styles from "./styles.css";

type ButtonProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    component?: T;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };

type ButtonComponent = <T extends React.ElementType = "button">(
  props: ButtonProps<T> & {
    ref?: React.ComponentPropsWithRef<T>["ref"];
  }
) => React.ReactNode | null;

export const Button: ButtonComponent = forwardRef(
  <T extends React.ElementType = "button">(
    {
      component,
      startIcon,
      endIcon,
      children,
      ...otherProps
    }: React.PropsWithChildren<ButtonProps<T>>,
    ref: React.ComponentPropsWithRef<T>["ref"]
  ) => {
    const Component: React.ElementType = component || "button";

    const { className, ...rest } = otherProps;

    return (
      <Component
        className={clsx(styles.button, className)}
        role="button"
        ref={ref}
        {...rest}
      >
        {startIcon}
        {children}
        {endIcon}
      </Component>
    );
  }
);
