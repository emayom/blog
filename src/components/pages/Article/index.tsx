import { useParams } from "react-router-dom";

import Utterances from "../../Utterances";

export const Article = () => {
  const { title } = useParams();

  return (
    <>
      <h3>{title}</h3>
      <Utterances
        repo="emayom/blog"
        label="💬 Comment"
      ></Utterances>
    </>
  );
};
