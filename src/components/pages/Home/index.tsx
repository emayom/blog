import { Introduce } from "../../Introduce";

import * as styles from "./style.css";
import { font } from "../../../styles/styles.css";

export const Home = () => {
  return (
    <div className={styles.layout}>
      <Introduce name="임아영" nickname="emayom">
        <>
          작은 불편함이더라도 <b className={font.serif}>개선</b>해나가는 것에
          즐거움을 느낍니다.
          <br />
          <b className={font.serif}>관성</b>에서 벗어나기 위해 배우고
          탐구합니다.
        </>
      </Introduce>
    </div>
  );
};
