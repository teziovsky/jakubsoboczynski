<template>
  <div class="layout">
    <HeaderBlog />
    <main class="container">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script>
import HeaderBlog from '~/components/HeaderBlog.vue';
import Footer from '~/components/Footer.vue';

export default {
  name: 'BlogLayout',
  components: {
    HeaderBlog,
    Footer,
  },
};
</script>

<style lang="scss">
</style>
