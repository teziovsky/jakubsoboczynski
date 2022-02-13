<template>
  <section v-if="projects.length" id="projekty" class="projects">
    <h2 class="sectionHeader">Projekty</h2>
    <ProjectCard v-for="project in projects" :key="project.node.id" :project="project.node" />
  </section>
</template>

<script>
import ProjectCard from "~/components/ProjectCard.vue";

export default {
  name: "Projects",
  components: {
    ProjectCard,
  },
  props: {
    projects: Array,
  },
};
</script>

<style lang="scss" scoped>
.projects {
  padding: 100px 0;
}
</style>
