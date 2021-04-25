<template>
  <section v-if="technologies" id="technologies">
    <h2 class="section--title">Technologies</h2>
    <div class="wrapper">
      <Technology
        v-for="(technology, index) in technologies.allTechnologies"
        :key="index"
        :technology="technology"
      />
    </div>
  </section>
</template>

<script>
import { request } from '@/lib/datocms';
import Technology from '../components/Technology.vue';

export default {
  name: 'Technologies',
  components: {
    Technology,
  },
  data() {
    return {
      technologies: [],
    };
  },
  async mounted() {
    this.technologies = await request({
      query: `
        {
          allTechnologies(orderBy: order_ASC) {
            title
            description
            image {
              url
            }
          }
        }
      `,
    });
  },
};
</script>

<style lang="scss" scoped>
@import '../global.scss';

#Technologies {
  padding-bottom: 50px;
}
</style>
