<template>
  <ul v-if="$static.Links.edges.length" class="socialLinks">
    <li v-for="link in $static.Links.edges" :key="link.node.id" class="socialLinks__item">
      <a
        :aria-label="link.node.title"
        :href="link.node.url"
        class="socialLinks__link"
        rel="noreferrer nofollow noopener"
        target="_blank"
        v-html="link.node.image">
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SocialLinks",
};
</script>

<style lang="scss" scoped>
.socialLinks {
  position: fixed;
  top: calc(50% - 120px);
  left: 45px;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 40px;

  &__item {
    width: 30px;
    height: 30px;
  }

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

@media screen and (min-width: 768px) {
  .socialLinks {
    display: flex;
  }
}
</style>

<!--language=GRAPHQL-->
<static-query>
query {
  Links: allLinks(sortBy: "id", order: ASC) {
    edges {
      node {
        id
        name
        url
        title
        image
      }
    }
  }
}
</static-query>
