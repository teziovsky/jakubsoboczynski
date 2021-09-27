<template>
  <Layout>
    <section class="blogPost">
      <Breadcrumbs />
      <article class="blogPost__article">
        <h1 class="sectionHeader">{{ $page.Post.title }}</h1>
        <g-image :src="$page.Post.image[0].url" class="blogPost__image" />
        <div class="blogPost__content" v-html="$page.Post.content"></div>
        <hr class="blogPost__separator" />
        <div class="blogPost__metatags">
          <span class="blogPost__category">{{ $page.Post.category }}</span>
          <span class="blogPost__date">{{ $page.Post.date }}</span>
        </div>
      </article>
    </section>
  </Layout>
</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue';

export default {
  name: 'Post',
  components: {
    Breadcrumbs,
  },
  mounted() {
    console.log('this.$route: ', this.$route);
    console.log('this.$page.Post: ', this.$page.Post);
  },
  metaInfo() {
    return {
      title: this.$page.Post.title,
      meta: [
        {
          name: 'author',
          content: 'Jakub Soboczyński',
        },
        {
          name: 'description',
          content: this.$page.Post.content,
        },
        {
          name: 'twitter:title',
          content: this.$page.Post.title,
        },
        {
          name: 'twitter:description',
          content: this.$page.Post.content,
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:creator',
          content: 'teziovsky',
        },
        {
          name: 'twitter:site',
          content: 'teziovsky',
        },
        {
          name: 'og:title',
          content: this.$page.Post.title,
        },
        {
          name: 'og:description',
          content: this.$page.Post.content,
        },
        {
          name: 'og:image',
          content: this.$page.Post.image.length && this.$page.Post.image[0].url,
        },
      ],
      link: [
        {
          rel: 'canonical',
          content: this.$static.metadata.siteUrl + this.$page.Post.path,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.blogPost {
  padding-top: 180px;

  &__article {
    max-width: 50em;
    margin: 0 auto;
  }

  &__image {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  &__content {
    text-align: justify;
    font-family: var(--font-family-primary);
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.5px;
  }

  &__separator {
    display: block;
    opacity: 0.8;
    margin: 20px 0;
  }

  &__metatags {
    display: flex;
    justify-content: space-between;
  }

  &__category {
    opacity: 0.8;
    font-family: var(--font-family-secondary);
    font-size: 14px;
    color: var(--third-color);
    transition: color var(--transition-duration) var(--transition-timing-function);
  }

  &__date {
    display: block;
    opacity: 0.8;
    text-align: center;
    font-family: var(--font-family-primary);
    font-size: 14px;
  }
}
</style>

<page-query>
query blogPost ($id: ID!) {
  Post: blogPost(id: $id) {
    id
    path
    image {
      url
    }
    title
    short
    date
    category
    content
  }
}
</page-query>

<static-query>
query {
  metadata {
   siteUrl
  }
}
</static-query>