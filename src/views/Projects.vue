<template>
  <section id="Projects">
    <h2 class="section--title">Projects</h2>
    <div class="wrapper">
      <Project v-for="(project, index) in projects" :key="index" :project="project" />
    </div>
  </section>
</template>

<script>
import Project from '../components/Project.vue';

export default {
  name: 'Projects',
  data() {
    return {
      projects: [
        {
          image: 'movie_search_engine',
          title: 'Movies search engine',
          description:
            'The movie search engine with The Movie DB API. Created for the needs of recruitment to Junior Frontend Developer.',
          github_link: 'https://github.com/teziovsky/movie-search-engine#readme',
          demo_link: 'https://teziovsky.github.io/movie-search-engine/',
        },
        {
          image: 'servicebook',
          title: 'Car service book',
          description:
            'The car service book website wrote in Vue.js. Using vuetify, vuex store, vuelidate, vue-router and vue-axios to connect with MySQL database.',
          github_link: 'https://github.com/teziovsky/service-book#readme',
          demo_link: 'https://teziovsky.github.io/service-book/',
        },
        {
          image: 'lenovo',
          title: 'Lenovo product card',
          description:
            'The Lenovo product card website created for the needs of recruitment to Junior Frontend Developer. PSD to HTML using HTML5, CSS3/SASS and RWD.',
          github_link: 'https://github.com/teziovsky/product_card#readme',
          demo_link: 'https://teziovsky.github.io/product_card/',
        },
        {
          image: 'image_search_engine',
          title: 'Image search engine',
          description:
            'The image search engine wrote in Vue.js. Using axios to get data from Flickr API and SCSS to add styles to this project.',
          github_link: 'https://github.com/teziovsky/images-gallery#readme',
          demo_link: 'https://teziovsky.github.io/images-gallery/',
        },
      ],
    };
  },
  components: {
    Project,
  },
};
</script>

<style lang="scss" scoped>
@import '../global.scss';

#Projects {
  background-color: $background-secondary-color;
  padding-bottom: 50px;
}
</style>
