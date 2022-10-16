import profilePicture from "assets/images/profile.webp";
import aboutMe from "content/about-me.json";
import Image from "next/image";
import React from "react";

console.log("aboutMe: ", aboutMe);
const title = "test";

const AboutMe = () => {
  return (
    <section id="o_mnie" className="aboutMe">
      <button className="button">Test</button>
      <h2 className="section-header">O mnie</h2>
      <div className="aboutMe__wrapper">
        <Image src={profilePicture} alt="Moje zdjęcie profilowe" className="aboutMe__image" />
      </div>
      <div className="aboutMe__categories">
        <button
          v-for="category in aboutMe"
          key="category.sort"
          aria-label="'Wyświetl treść kategorii - ' + category.title"
          // className="{ active: active === category.sort }"
          className="aboutMe__category"
          onClick={() => console.log("test")}>
          {title}
        </button>
      </div>
      {/*<p key="selectedDescription.sort" className="aboutMe__description">*/}
      {/*  {selectedDescription.description}*/}
      {/*</p>*/}
    </section>
  );
};

export default AboutMe;
