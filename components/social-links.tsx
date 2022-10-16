import React from "react";
import socialLinks from "content/social-links.json";

const SocialLinks = () => {
  return (
    <ul className="socialLinks">
      {socialLinks.map((link) => (
        <li key={link.id} className="socialLinks__item">
          <a
            aria-label={link.buttonTitle}
            href={link.url}
            className="socialLinks__link"
            rel="noreferrer nofollow noopener"
            target="_blank"
            dangerouslySetInnerHTML={{ __html: link.icon }}></a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
