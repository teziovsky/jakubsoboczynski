<template>
  <Layout>
    <Hero />
    <!--    <AboutMe :aboutMe="$page.aboutMe.edges" />-->
    <!--    <Projects :projects="$page.projects.edges" />-->
    <!--    <Contact :contact="$page.contact.edges" />-->
  </Layout>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutMe from "~/views/AboutMe.vue";
import Contact from "~/views/Contact.vue";
import Hero from "~/views/Hero.vue";
import Projects from "~/views/Projects.vue";

export default {
  name: "Homepage",
  metaInfo: {
    title: "Hello!",
  },
  components: {
    Hero,
    AboutMe,
    Projects,
    Contact,
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);

    this.$nextTick(() => {
      gsap.utils
        .toArray("section")
        .slice(1)
        .forEach((section) => {
          section.childNodes.forEach((element, index) => {
            gsap.fromTo(
              element,
              {
                opacity: 0,
              },
              {
                opacity: 1,
                duration: 0.5,
                delay: 0.5 * index,
                scrollTrigger: {
                  trigger: section,
                  start: "top 50%",
                },
              }
            );
          });
        });
    });
  },
};
</script>

<!--language=GRAPHQL-->
<!--<page-query>-->
<!--query {-->
<!--  aboutMe: allAboutMe(sortBy: "properties.sort.number", order: ASC) {-->
<!--    edges {-->
<!--      node {-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--  projects: allProjects(sortBy: "properties.sort.number", order: ASC) {-->
<!--    edges {-->

<!--    }-->
<!--  }-->
<!--  contact: allContact(sortBy: "properties.sort.number", order: ASC) {-->
<!--    edges {-->

<!--    }-->
<!--  }-->
<!--}-->
<!--</page-query>-->
