import clsx from "clsx";
import * as styles from "./styles.css";
import { font, underline, underlineOffset } from "../../../styles/styles.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>Copyright © 2024. emayom All rights reserved.</span>
      <p>
        <span>The source code is available on </span>
        <a
          className={clsx(font.medium, underline, underlineOffset)}
          href="https://github.com/emayom/emayom.github.io"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
};
