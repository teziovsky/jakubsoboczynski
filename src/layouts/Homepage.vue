<template>
  <div>
    <HeaderHome />
    <SocialLinks />
    <PageProgress />
    <transition appear name="scale">
      <main class="container">
        <slot />
      </main>
    </transition>
    <Footer />
  </div>
</template>


<script>
import HeaderHome from '~/components/HeaderHome.vue';
import SocialLinks from '~/components/SocialLinks.vue';
import PageProgress from '~/components/PageProgress.vue';
import Footer from '~/components/Footer.vue';

export default {
  name: 'HomepageLayout',
  components: {
    HeaderHome,
    SocialLinks,
    PageProgress,
    Footer,
  },
};
</script>

<style lang="scss">
.container {
  padding: 0 120px;
}
</style>
