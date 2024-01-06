import { useThemeContext } from "../../../context/ThemeContext";

import clsx from "clsx";
import * as styles from "./styles.css";

import GitHubSVG from "../../../assets/github.svg?react";
import MailSVG from "../../../assets/mail.svg?react";
import SwitchSVG from "../../../assets/switch.svg?react";

export const Header = () => {
  const { isDark, toggleTheme } = useThemeContext();

  const emoji =
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20in%20Clouds.png";

  const logo =
    `https://readme-typing-svg.herokuapp.com?font=Fugaz+One&size=24&duration=2500&pause=30000&color=${isDark? 'F8F8F2' : '3C3C43'}&center=true&vCenter=true&random=false&width=110&height=26&lines=emayom`;

  const className = clsx(styles.header);

  return (
    <header className={className}>
      <div className={styles.container}>
        <a className={styles.title} href="/">
          <img
            src={emoji}
            srcSet={emoji}
            alt="Face in Clouds"
            width="60"
            height="60"
          />
          <img src={logo} srcSet={logo} alt="Typing SVG Logo" />
        </a>
        <div className={styles.container}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a
              className={styles.anchor}
              href="https://github.com/emayom"
              target="_blank"
            >
              <GitHubSVG />
            </a>
            <a
              className={styles.anchor}
              target="_blank"
              href="mailto:emayom@naver.com"
            >
              <MailSVG />
            </a>
            <button
              className={styles.toggleBtn}
              type="button"
              onClick={toggleTheme}
            >
              <SwitchSVG
                width={25}
                height={25}
                transform={isDark ? "rotate(180), scale(-1 1)" : ""}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
