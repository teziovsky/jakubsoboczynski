import React from "react";
import contacts from "content/contacts.json";

const Contact = () => {
  return (
    <section id="kontakt" className="contact">
      <h2 className="section-header">Kontakt</h2>
      <p className="contact__description">{contacts[0].description}</p>
      <div className="contact__button">
        <a
          aria-label="Wyślij e-maila na adres jakub.soboczynski@icloud.com"
          className="button"
          href="mailto:jakub.soboczynski@icloud.com"
          rel="noreferrer nofollow noopener"
          target="_blank">
          Cześć
        </a>
      </div>
    </section>
  );
};

export default Contact;
