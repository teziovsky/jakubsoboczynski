<template>
  <div class="layout">
    <transition appear name="slide-top">
      <Header :key="$route.name" />
    </transition>
    <transition appear name="slide-left">
      <SocialLinks v-if="$route.name === 'home'" />
    </transition>
    <transition appear name="slide-right">
      <PageProgress v-if="$route.name === 'home'" />
    </transition>
    <transition appear name="slide-bottom">
      <main class="container">
        <slot />
      </main>
    </transition>
    <transition appear name="slide-bottom">
      <Footer :key="$route.name" />
    </transition>
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
