<template>
  <Layout>
    <section id="blog" class="blog">
      <h1 class="sectionHeader">Blog</h1>
      <transition mode="out-in" name="slide-down">
        <div v-if="$page.Blog.edges.length" class="blog__wrapper">
          <BlogCard v-for="post in $page.Blog.edges"
                    v-if="post.node.date < actualDate"
                    :key="post.node.id"
                    :post="post" />
        </div>
        <div v-else key="noArticles" class="alert">Brak artykułów. Wpadnij tu za tydzień!</div>
      </transition>
    </section>
  </Layout>
</template>

<script>
import Layout from '~/layouts/Default.vue';
import BlogCard from '~/components/BlogCard.vue';

export default {
  metaInfo: {
    title: 'Blog',
  },
  components: {
    Layout,
    BlogCard,
  },
  data() {
    return {};
  },
  computed: {
    actualDate() {
      return new Date().toISOString().split('T')[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.blog {
  min-height: calc(100vh - 230px);
  padding-top: 180px;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px 50px;
  }
}

@media screen and (min-width: 768px) {
  .blog {
    min-height: calc(100vh - 200px);
  }
}
</style>

<page-query>
query {
  Blog: allBlogPost(sortBy: "date", order: DESC) {
    edges {
      node {
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
  }
}
</page-query>