import React from "react";
import contacts from "content/contacts.json";

const Contact = () => {
  return (
    <section id="kontakt" className="p-contact min-h-inner-screen-contact lg:min-h-inner-screen-lg">
      <h2 className="section-header">Kontakt</h2>
      <p className="font-light text-base md:text-lg mx-auto mt-0 mb-8 text-center max-w-[700px]">
        {contacts[0].description}
      </p>
      <div className="flex-center">
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
