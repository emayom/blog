import { useState, useRef, useEffect } from "react";

export type UtterancesThemeType =
  | "GitHub Light"
  | "GitHub Dark"
  | "preferred-color-scheme"
  | "GitHub Dark Orange"
  | "Icy Dark"
  | "Dark Blue"
  | "Photon Dark"
  | "Boxy Light"
  | "Gruvbox Dark";

export type UtterencesProps = {
  repo: string;
  label?: string;
  theme?: UtterancesThemeType;
  crossorigin?: string;
};

/**
 * TODO: Custom hook 분리
 */
const Utterances = ({
  repo,
  label = "Comment",
  theme = "preferred-color-scheme",
  crossorigin = "anonymous",
}: UtterencesProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const src = "https://utteranc.es/client.js";

  useEffect(() => {
    console.log;
    if (ref.current?.querySelector(`script[src="${src}"]`)) {
      return;
    }

    const script = document.createElement("script");
    const attributes = {
      src,
      repo,
      label,
      theme,
      crossorigin,
      async: "true",
      "issue-term": "pathname",
    };

    Object.entries(attributes).forEach(([key, value]) =>
      script.setAttribute(key, value)
    );

    script.addEventListener("load", () => setIsLoaded(true));
    ref.current?.appendChild(script);
  }, [repo, label, crossorigin, theme]);

  return <div ref={ref}>{!isLoaded && <div>Loading ... </div>}</div>;
};

export default Utterances;
