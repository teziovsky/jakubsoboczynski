<template>
  <Layout>
    <SocialLinks />
    <PageProgress />
    <Hero />
    <AboutMe :aboutMe="$page.aboutMe.edges" />
    <Projects :projects="$page.projects.edges" />
    <Contact :contact="$page.contact.edges" />
  </Layout>
</template>

<script>
import SocialLinks from '~/components/SocialLinks.vue';
import PageProgress from '~/components/PageProgress.vue';
import Hero from '~/views/Hero.vue';
import AboutMe from '~/views/AboutMe.vue';
import Projects from '~/views/Projects.vue';
import Contact from '~/views/Contact.vue';

export default {
  name: 'Homepage',
  metaInfo: {
    title: 'Portfolio',
  },
  components: {
    SocialLinks,
    PageProgress,
    Hero,
    AboutMe,
    Projects,
    Contact,
  },
};
</script>

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