<template>
  <section id="kontakt" class="contact">
    <h2>Kontakt</h2>
    {{ contact }}
  </section>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    contact: Array,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.contact {
  min-height: 50vh;
}
</style>
