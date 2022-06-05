<template>
  <div class="layout">
    <transition appear mode="out-in" name="slide-top">
      <Header />
    </transition>
    <transition appear mode="out-in" name="slide-left">
      <SocialLinks v-if="$route.name === 'home'" :key="$route.name" />
    </transition>
    <transition appear mode="out-in" name="slide-right">
      <PageProgress v-if="$route.name === 'home'" :key="$route.name" />
    </transition>
    <transition appear mode="out-in" name="slide-right">
      <ColorChanger v-if="$route.name === 'home'" :key="$route.name"></ColorChanger>
    </transition>
    <transition appear mode="out-in" name="slide-bottom">
      <main class="container">
        <slot />
      </main>
    </transition>
    <transition appear mode="out-in" name="slide-bottom">
      <Footer />
    </transition>
  </div>
</template>

<script>
import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";
import PageProgress from "~/components/PageProgress.vue";
import SocialLinks from "~/components/SocialLinks.vue";
import ColorChanger from "../components/ColorChanger.vue";

export default {
  name: "DefaultLayout",
  components: {
    Header,
    SocialLinks,
    PageProgress,
    ColorChanger,
    Footer,
  },
};
</script>
