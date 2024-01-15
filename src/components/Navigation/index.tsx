import { Link } from "react-router-dom";

import * as styles from "./styles.css";

const Nav = () => {
  const lists = [
    {
      to: "/posts",
      children: "Posts",
    },
    {
      to: "/resume",
      children: "Resume",
    },
  ];

  return (
    <ul className={styles.topNav}>
      {lists.map((tab) => (
        <li key={tab.children}>
          <Link className={styles.link} to={tab.to}>
            {tab.children}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
