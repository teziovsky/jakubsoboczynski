<template>
  <section v-if="projects" id="projects">
    <h2 class="section--title">Projects</h2>
    <div class="wrapper">
      <Project v-for="project in projects" :key="project.id" :project="project" />
    </div>
  </section>
</template>

<script>
import Project from '../components/Project.vue';
import Airtable from 'airtable';

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
  mounted() {
    const base = new Airtable({ apiKey: 'keyARCmM79wgxzEKF' }).base('appQyH2lhdVfa8dLf');
    base('projects').select({ view: 'Grid view' }).eachPage((records, fetchNextPage) => {
      const result = records.map(item => item.fields);
      this.projects.push(...result);
      fetchNextPage();
    }, (error) => {
      if (error) {
        console.error(error);
        return false;
      }
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
