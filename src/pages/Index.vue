<template>
  <HomepageLayout>
    <Hero />
    <AboutMe :AboutMe="$page.AboutMe.edges" />
    <Projects :Projects="$page.Projects.edges" />
    <Contact :Contact="$page.Contact.edges" />
  </HomepageLayout>
</template>

<page-query>
query {
  Links: allLinks(sortBy: "id", order: ASC) {
    edges {
      node {
        id
        name
        url
        buttonTitle
      }
    }
  }
  AboutMe: allAboutMe(sortBy: "id", order: ASC) {
    edges {
      node {
        id
        title
        description
      }
    }
  }
  Projects: allProjects(sortBy: "id", order: ASC) {
    edges {
      node {
        id
        title
        description
        technologies
        source
        demo
        image {
          id
          url
        }
        imageAlt
      }
    }
  }
  Contact: allContact {
    edges {
      node {
        id
        title
        description
      }
    }
  }
}
</page-query>

<script>
import Hero from '~/views/Hero.vue';
import AboutMe from '~/views/AboutMe.vue';
import Projects from '~/views/Projects.vue';
import Contact from '~/views/Contact.vue';

export default {
  name: 'Homepage',
  components: {
    Hero,
    AboutMe,
    Projects,
    Contact,
  },
};
</script>
