import { useEffect } from "react";

import clsx from "clsx";
import * as styles from "./styles.css";
// import mainLogo from "/emayom.svg";

export const Header = () => {
  //   const { toggleTheme, isDarkMode } = useContext(Context);

  const emoji =
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20in%20Clouds.png";

  const logo =
    "https://readme-typing-svg.herokuapp.com?font=Fugaz+One&size=24&duration=2500&pause=30000&color=3C3C43&center=true&vCenter=true&random=false&width=110&height=26&lines=emayom";

  useEffect(() => {
    console.log("useEffect");
  });

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
        <div className="content">
          {/* <div onClick={toggleTheme}>{!isDarkMode ? "🌙 " : "☀️"}</div> */}
        </div>
      </div>
    </header>
  );
};
