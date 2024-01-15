import Nav from "@components/Navigation";
import ThemeSwitchButton from "@components/ThemeSwitchButton";

import * as styles from "./styles.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a className={styles.title} href="/">
          {/* NOTE 아직 로고를 사용하지 않음 */}
        </a>
        <div className={styles.container}>
          <Nav />
          <ThemeSwitchButton />
        </div>
      </div>
    </header>
  );
};
