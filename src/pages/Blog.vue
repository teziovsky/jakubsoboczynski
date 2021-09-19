<template>
  <BlogLayout>
    <h1>Blog page</h1>
    {{ $page.Blog }}
  </BlogLayout>
</template>

<page-query>
query {
  Blog: allBlog(sortBy: "date", order: DESC) {
    edges {
      node {
        id
        title
        content
        short
        date
        category
        image {
          url
        }
      }
    }
  }
}
</page-query>

<script>
import BlogLayout from '~/layouts/Blog.vue';

export default {
  metaInfo: {
    title: 'Blog',
  },
  components: {
    BlogLayout,
  },
  data() {
    return {};
  },
};
</script>
