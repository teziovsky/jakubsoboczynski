<template>
  <ul class="socialLinks">
    <li v-for="link in $static.Links.edges" :key="link.node.id" class="socialLinks__item">
      <a :href="link.node.url" class="socialLinks__link" rel="nofollow noopener" target="_blank">
        <g-image :alt="'Logo of ' + link.node.name"
                 :src="link.node.image[0].url"
                 class="socialLinks__image"
                 fit="contain" />
        <span class="sr-only">{{ link.node.description }}</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'SocialLinks',
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.socialLinks {
  position: fixed;
  top: 50%;
  left: 50px;
  display: none;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transform: translateY(-50%);
  row-gap: 40px;

  &__item {
    width: 20px;
  }

  &__link {
    display: flex;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &:hover,
    &:focus {
      animation: bounce-x 2s 0.2s ease-out infinite;
    }

    &:focus {
      outline: 2px dotted var(--third-color);
      outline-offset: 7px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
        image {
          url
        }
      }
    }
  }
}
</static-query>