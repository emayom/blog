import React from "react";

import SocialLink from "@components/SocialLink";

import * as styles from "./styles.css";

type IntroduceProps = {
  name: string;
  nickname: string;
};

export const Introduce = ({
  name,
  nickname,
  children,
}: React.PropsWithChildren<IntroduceProps>) => {
  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.self}>{[name, nickname].join(" ﹒ ")}</h1>
      <p className={styles.introduction}>{children}</p>
      <SocialLink size={"s"} color={"tertiary"} />
    </div>
  );
};
