// import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@components/Button";
import { Container } from "@components/layout";
// import { IMetadata } from "@components/Metadata";

import ReturnSVG from "../../../assets/return.svg?react";

import * as styles from "./styles.css";

export const Post = () => {
  const navigate = useNavigate();
  // const [posts, setPosts] = useState<IMetadata[]>([]);

  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);

  return (
    <Container component="div" className={styles.layout}>
      <div>
        <Button onClick={() => navigate(-1)}>
          <ReturnSVG width={18} />
        </Button>
      </div>
      <div>
        <div>
          <span className={styles.prefix}>Written by</span>
          <div className={styles.badge} onClick={() => navigate("/about")}>
            <strong className={styles.badgeText}>@emayom</strong>
          </div>
        </div>
      </div>
    </Container>
  );
};
