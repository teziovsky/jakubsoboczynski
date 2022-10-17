import cx from "classnames";
import socialLinks from "content/social-links.json";
import React from "react";

type Props = {
  className?: string;
};

const SocialLinks = ({ className }: Props) => {
  return (
    <ul
      className={cx(className, {
        "fixed hidden left-[45px] top-1/2 -translate-y-1/2 md:flex flex-col items-center justify-center gap-y-9":
          !className,
      })}>
      {socialLinks.map((link) => (
        <li key={link.id}>
          <a
            aria-label={link.buttonTitle}
            href={link.url}
            className="flex items-center justify-center w-7 h-7 p-1"
            rel="noreferrer nofollow noopener"
            target="_blank"
            dangerouslySetInnerHTML={{ __html: link.icon }}></a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
