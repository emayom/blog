import React, { forwardRef } from "react";

import * as styles from "./styles.css";

type ContainerProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    component?: T;
  };

export const Container = forwardRef(
  <T extends React.ElementType = "div">(
    {
      component,
      children,
      ...otherProps
    }: React.PropsWithChildren<ContainerProps<T>>,
    ref: React.ComponentPropsWithRef<T>["ref"]
  ) => {
    const Component: React.ElementType = component || "div";
    return (
      <Component className={styles.container} ref={ref} {...otherProps}>
        {children}
      </Component>
    );
  }
);
