<template>
  <Layout>
    <Hero />
    <AboutMe :aboutMe="$page.aboutMe.edges" />
    <Projects :projects="$page.projects.edges" />
    <Contact :contact="$page.contact.edges" />
  </Layout>
</template>

<script>
import Hero from "~/views/Hero.vue";
import AboutMe from "~/views/AboutMe.vue";
import Projects from "~/views/Projects.vue";
import Contact from "~/views/Contact.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
                duration: 1.5,
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
<page-query>
query {
  aboutMe: allAboutMe(sortBy: "id", order: ASC) {
    edges {
      node {
        id
        title
        description
      }
    }
  }
  projects: allProjects(sortBy: "id", order: ASC) {
    edges {
      node {
        id
        title
        description
        technologies
        source
        demo
        image {
          url
        }
        imageAlt
      }
    }
  }
  contact: allContact {
    edges {
      node {
        id
        description
      }
    }
  }
}
</page-query>
