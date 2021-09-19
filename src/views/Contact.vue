<template>
  <section id="kontakt">
    <h2>Kontakt</h2>
    {{ Contact }}
  </section>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    Contact: Array,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style scoped>
</style>
