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

<style>
body {
  font-family: var(--font-family);
  color: var(--font-color);
  background-color: var(--primary-color);
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
