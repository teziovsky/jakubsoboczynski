<template>
  <div class="breadcrumbs">
    <g-link aria-label="Przejdź do podstrony zawierającej blog" class="breadcrumbs__item" to="/blog/"> Blog </g-link>
    <span class="breadcrumbs__separator">></span>
    <span class="breadcrumbs__item">{{ postTitle }}</span>
  </div>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: {
    postTitle: String,
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
  column-gap: 5px;

  &__separator {
    opacity: 0.4;
  }

  &__item {
    opacity: 0.4;
    padding: 5px 8px;

    &:not(span) {
      @extend .link;
      opacity: 1;

      &:after {
        bottom: 2.5px;
        width: calc(80% - 16px);
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .breadcrumbs {
    margin-bottom: 20px;
  }
}
</style>
