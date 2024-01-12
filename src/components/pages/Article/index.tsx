import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import readingTime from "reading-time";
import remarkGfm from "remark-gfm"; /** GFM(Github Flavored Markdown) */
import rehypeRaw from "rehype-raw"; /** HTML 태그를 랜더링하는 방법을 제어하는 플러그인 */
import Markdown from "react-markdown";
import * as matter from "gray-matter"; /** front matter를 추출하여 JavaScript 객체로 변환하는 플러그인 */
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
    readingTime: "",
  });

  useEffect(() => {
    import(`../../../posts/${title}.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => {
            const { data, content } = matter(res);
            const { title, date, description, categories, published } = data;

            setMetadata({
              title,
              date,
              description,
              categories,
              published,
              readingTime: readingTime(content).text,
            });
            setMarkdown(content);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [title]);

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
