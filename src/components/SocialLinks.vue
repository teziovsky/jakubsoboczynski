<template>
  <ul class="socialLinks">
    <li v-for="link in $static.Links.edges" :key="link.node.id" class="socialLinks__item">
      <a :href="link.node.url"
         class="socialLinks__link"
         rel="nofollow noopener"
         target="_blank"
         v-html="link.node.image">
        <span class="sr-only">{{ link.node.description }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SocialLinks',
};
</script>

<style lang="scss" scoped>
.socialLinks {
  position: fixed;
  top: 50%;
  left: 45px;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
  row-gap: 40px;

  &__item {
    width: 30px;
    height: 30px;
  }

  &__link {
    @include flex-center;
    width: 100%;
    height: 100%;

    @include hover {
      animation: bounce-x 2s 0.2s ease-out infinite;

      path {
        stroke: var(--third-color);
      }
    }

    svg {
      width: 20px;
      height: 20px;

      path {
        transition: stroke 0.2s cubic-bezier(0.19, 1, 0.22, 1);
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

<static-query>
query {
  Links: allLinks(sortBy: "id", order: ASC) {
    edges {
      node {
        id
        name
        url
        description
        image
      }
    }
  }
}
</static-query>