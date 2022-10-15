import React from "react";

const SocialLinks = () => {
  return (
    <ul className="socialLinks">
      <li v-for="link in socialLinks" key="link.sort" className="socialLinks__item">
        <a
          aria-label="link.button_title"
          href="link.url"
          className="socialLinks__link"
          rel="noreferrer nofollow noopener"
          target="_blank"
          v-html="link.icon"></a>
      </li>
    </ul>
  );
};

export default SocialLinks;
