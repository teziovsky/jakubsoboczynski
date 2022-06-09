<template>
  <ul v-if="socialLinks.length" class="socialLinks">
    <li v-for="link in socialLinks" :key="link.createdAt" class="socialLinks__item">
      <a
        :aria-label="link.button_title"
        :href="link.url"
        class="socialLinks__link"
        rel="noreferrer nofollow noopener"
        target="_blank"
        v-html="link.icon">
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SocialLinks",
  computed: {
    socialLinks() {
      return this.$store.state.socialLinks;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";

.socialLinks {
  &__link::v-deep {
    @include flex-center;
    width: 100%;
    height: 100%;
    transition: transform var(--transition-duration) var(--transition-timing-function);

    svg {
      width: 20px;
      height: 20px;

      path {
        transition: stroke var(--transition-duration) var(--transition-timing-function);
        stroke: var(--font-color);
      }
    }

    @include hover {
      transform: scale(1.12) translateY(-5px);

      path {
        stroke: var(--third-color);
      }
    }
  }
}
</style>
