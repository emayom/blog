import GitHubSVG from "../../assets/github.svg?react";
import MailSVG from "../../assets/mail.svg?react";

import * as styles from "./styles.css";

const links = [
  {
    title: "GitHub",
    href: "https://github.com/emayom",
    children: <GitHubSVG />,
  },
  {
    title: "Mail",
    href: "mailto:emayom@naver.com",
    children: <MailSVG />,
  },
];

type SocialLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  size: keyof typeof styles.link;
  color: keyof typeof styles.linkContainer;
};

const SocialLink = ({ size, color, ...otherProps }: SocialLinkProps) => (
  <div className={styles.linkContainer[color]}>
    {links.map((link, idx) => (
      <a
        key={idx}
        className={styles.link[size]}
        title={link.title}
        target="_blank"
        href={link.href}
        {...otherProps}
      >
        {link.children}
      </a>
    ))}
  </div>
);

export default SocialLink;
