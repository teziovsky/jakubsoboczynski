<template>
  <section v-if="projects" id="projects">
    <h2 class="section--title">Projects</h2>
    <div class="wrapper">
      <Project v-for="(project, index) in projects.allProjects" :key="index" :project="project" />
    </div>
  </section>
</template>

<script>
import { request } from '@/lib/datocms';
import Project from '../components/Project.vue';

export default {
  name: 'Projects',
  components: {
    Project,
  },
  data() {
    return {
      projects: [],
    };
  },
  async mounted() {
    this.projects = await request({
      query: `
        {
          allProjects(orderBy: order_ASC) {
            title
            description
            source
            demo
            screen {
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

#Projects {
  padding-bottom: 50px;
  background-color: $background-secondary-color;
}
</style>
