<template>
  <Layout>
    <section class="article">
      <Breadcrumbs />
      <article>
        <h1>{{ $page.Post.title }}</h1>
        <p>{{ $page.Post.content }}</p>
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
  created() {
    console.log('this.$route: ', this.$route);
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
          content: this.$page.post.image[0].url,
        },
      ],
      link: [
        {
          rel: 'canonical',
          content: this.$static.metadata.baseURL + this.$page.post.path,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.article {
  padding-top: 180px;
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