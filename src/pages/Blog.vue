<template>
  <Layout>
    <section id="blog" class="blog">
      <h1 class="sectionHeader">Blog</h1>
      <div v-if="filteredPosts.length" class="blog__container">
        <div class="blog__categories">
          <button v-for="category in categories"
                  :key="category"
                  :aria-label="'Wyświetl posty z kategorii - ' + category"
                  :class="{'active': activeCategory === category}"
                  class="blog__category"
                  @click="handleChangeCategory(category)">{{ category }}
          </button>
        </div>
        <transition-group class="blog__wrapper" mode="out-in" name="blog-bottom" tag="div">
          <BlogCard v-for="post in filteredPosts"
                    :key="post.node.id"
                    :post="post" />
        </transition-group>
      </div>
      <div v-else key="noArticles" class="alert">Brak artykułów. Wpadnij tu za tydzień!</div>
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
    return {
      activeCategory: '',
      categories: [],
    };
  },
  computed: {
    actualDate() {
      return new Date().toISOString().split('T')[0];
    },
    filteredPosts() {
      return this.$page.Blog.edges.filter(item => item.node.category.includes(this.activeCategory) && item.node.date < this.actualDate);
    },
  },
  methods: {
    handleChangeCategory(category) {
      if (this.activeCategory === '') {
        this.activeCategory = category;
        localStorage.setItem('blogCategory', category);
      } else if (this.activeCategory !== category) {
        this.activeCategory = category;
        localStorage.setItem('blogCategory', category);
      } else {
        this.activeCategory = '';
        localStorage.removeItem('blogCategory');
      }
    },
  },
  mounted() {
    this.categories = [...new Set(this.$page.Blog.edges.map(item => item.node.category))];
    this.activeCategory = localStorage.getItem('blogCategory') ? localStorage.getItem('blogCategory') : '';
  },
};
</script>

<style lang="scss" scoped>
.blog {
  min-height: calc(100vh - 230px);
  padding-top: 180px;

  &__categories {
    @include flex-center;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 40px;
    column-gap: 30px;
    row-gap: 15px;
  }

  &__category {
    position: relative;
    font-family: var(--font-family-secondary);
    font-size: 18px;
    line-height: 25px;
    text-transform: capitalize;
    color: var(--font-color);
    padding: 12px 22px;
    transition: box-shadow var(--transition-duration) var(--transition-timing-function), color var(--transition-duration) var(--transition-timing-function);

    @include hover {
      color: var(--third-color);
      box-shadow: inset 0 0 20px rgba(var(--third-color-rgb), 0.5);
    }

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: calc(80% - 44px);
      height: 1px;
      opacity: 0;
      background-color: var(--third-color);
      transform: translateX(-50%);
      transition: opacity 0.8s var(--transition-timing-function), background var(--transition-duration) var(--transition-timing-function);
    }

    &.active {
      &:after {
        opacity: 1;
      }
    }
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    gap: 50px 50px;
  }
}

@media screen and (min-width: 768px) {
  .blog {
    min-height: calc(100vh - 200px);

    &__categories {
      flex-direction: row;
    }
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