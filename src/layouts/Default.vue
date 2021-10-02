<template>
  <div class="layout">
    <Header />
    <SocialLinks v-if="$route.name === 'home'" />
    <PageProgress v-if="$route.name === 'home'" />
    <main class="container">
      <slot />
    </main>
    <Footer />
  </div>
</template>


<script>
import Header from '~/components/Header.vue';
import SocialLinks from '~/components/SocialLinks.vue';
import PageProgress from '~/components/PageProgress.vue';
import Footer from '~/components/Footer.vue';

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    SocialLinks,
    PageProgress,
    Footer,
  },
};
</script>
