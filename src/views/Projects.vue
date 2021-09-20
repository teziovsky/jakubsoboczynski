<template>
  <section id="projekty" class="projects">
    <h2 class="section_header">Projekty</h2>
    <ProjectCard v-for="project in projects" :key="project.node.id" :project="project.node" />
  </section>
</template>

<script>
import ProjectCard from '~/components/ProjectCard.vue';

export default {
  name: 'Projects',
  props: {
    projects: Array,
  },
  components: {
    ProjectCard,
  },
};
</script>

<style lang="scss" scoped>
.projects {
  min-height: 100vh;
}
</style>
