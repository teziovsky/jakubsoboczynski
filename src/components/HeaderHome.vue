<template>
  <header>
    <nav>
      <a href="#o_mnie">o mnie</a>
      <a href="#projekty">projekty</a>
      <a href="#kontakt">kontakt</a>
      <g-link to="/blog/">Blog</g-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderHome',
};
</script>

<style scoped>
.active--exact {
  @apply text-gray-900;
}
</style>