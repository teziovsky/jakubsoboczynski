<template>
  <div>
    <HeaderBlog />
    <transition appear name="scale">
      <main>
        <slot />
      </main>
    </transition>
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
