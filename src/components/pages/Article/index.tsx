import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Markdown from "react-markdown";
import * as matter from "gray-matter";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as style } from "react-syntax-highlighter/dist/esm/styles/prism";

import Metadata, { IMetadata } from "../../Metadata";
import Utterances from "../../Utterances";

export const Article = () => {
  const { title } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [markdown, setMarkdown] = useState("");
  const [metadata, setMetadata] = useState<IMetadata>({
    title: "",
    date: "",
    description: "",
    categories: [],
    published: false,
  });

  useEffect(() => {
    import(`../../../posts/${title}.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => {
            const { data, content } = matter(res);
            const { title, date, description, categories, published } = data;

            setMetadata({ title, date, description, categories, published });
            setMarkdown(content);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      {isLoading ? (
        <div>Loading ... </div>
      ) : (
        <div>
          <Metadata {...metadata} />

          <Markdown
            children={markdown}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, className, children, ref, ...rest }) {
                const match = /language-(\w+)/.exec(className || "");

                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={style}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
          <Utterances repo="emayom/blog" label="💬 Comment"></Utterances>
        </div>
      )}
    </>
  );
};
