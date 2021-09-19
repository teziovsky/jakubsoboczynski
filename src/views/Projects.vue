<template>
  <section id="projekty">
    <h2>Projekty</h2>
    {{ Projects }}
  </section>
</template>

<script>
export default {
  name: 'Projects',
  props: {
    Projects: Array,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style scoped>
</style>
