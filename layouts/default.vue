<template>
  <div class="layout">
    <TheHeader />
    <SocialLinks v-if="$route.name === 'index'" />
    <PageProgress v-if="$route.name === 'index'" />
    <transition appear mode="out-in" name="slide-bottom">
      <nuxt />
    </transition>
    <TheFooter />
  </div>
</template>

<script>
export default {
  name: "Default",
  head() {
    return {
      title: "Hello!",
    };
  },
  computed: {
    socialLinks() {
      return this.$store.state.socialLinks;
    },
  },
};
</script>
