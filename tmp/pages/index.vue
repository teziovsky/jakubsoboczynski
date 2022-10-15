<template>
  <main class="container">
    <Hero />
    <AboutMe :about-me="aboutMe" :about-me-picture="aboutMePicture" />
    <Projects :projects="projects" />
    <Contact :contact="contact" />
  </main>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

export default {
  name: "Homepage",
  async asyncData({ $content }) {
    const aboutMePicture = await $content("about-me-picture").sortBy("sort").fetch();
    const aboutMe = await $content("about-me").sortBy("sort").fetch();
    const projects = await $content("projects").sortBy("sort").fetch();
    const contact = await $content("contact").sortBy("sort").fetch();

    return {
      aboutMePicture,
      aboutMe,
      projects,
      contact,
    };
  },
};
</script>
