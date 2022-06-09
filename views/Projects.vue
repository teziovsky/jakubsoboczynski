<template>
  <section v-if="projects.length" id="projekty" class="projects">
    <h2 class="sectionHeader">Projekty</h2>
    <ProjectCard v-for="project in projects" :key="project.createdAt" :project="project" />
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
    projects: {
      type: Array,
      required: true,
    },
  },
};
</script>
