<template>
  <Layout>
    <section class="blogPost">
      <Breadcrumbs :postTitle="$page.Post.title" />
      <article class="blogPost__article">
        <h1 class="sectionHeader">{{ $page.Post.title }}</h1>
        <div class="blogPost__metatags">
          <span class="blogPost__date">{{ $page.Post.date }}</span>
          <span class="blogPost__category">{{ $page.Post.category }}</span>
        </div>
        <img v-if="$page.Post.image.length" :src="$page.Post.image[0].url" class="blogPost__image" />
        <div class="blogPost__content" v-html="$page.Post.content"></div>
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
  min-height: calc(100vh - 219px);
  padding-top: 150px;

  .sectionHeader {
    margin-bottom: 0.5em;
  }

  &__article {
    max-width: 50em;
    margin: 0 auto;
  }

  &__image {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  &__content::v-deep {
    text-align: justify;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.5px;

    h2 {
      position: relative;
      text-align: left;
      font-size: clamp(1.125rem, 1.03353656rem + 0.390244vw, 1.375rem);
      line-height: clamp(1.5rem, 1.36280484rem + 0.585366vw, 1.875rem);
      word-break: break-word;
      margin-bottom: 1.2em;
    }

    h3 {
      position: relative;
      font-size: clamp(1rem, 0.95426828rem + 0.195122vw, 1.125rem);
      line-height: clamp(1.25rem, 1.11280484rem + 0.585366vw, 1.625rem);
      word-break: break-word;
      margin-bottom: 1em;
    }

    p {
      font-size: clamp(0.875rem, 0.82926828rem + 0.195122vw, 1rem);
      line-height: clamp(1.125rem, 1.07926828rem + 0.195122vw, 1.25rem);
      word-break: break-word;
      margin-bottom: 1em;
    }

    a {
      @extend .link;
    }

    strong {
      font-weight: 700;
    }

    em {
      font-style: italic;
    }

    blockquote {
      background-color: rgba(var(--font-color-rgb), 0.15);
      border-left: 3px solid var(--font-color);
      margin: 0 clamp(1.25rem, 0.79268281rem + 1.95122vw, 2.5rem) 1em clamp(1.25rem, 0.79268281rem + 1.95122vw, 2.5rem);
      padding: clamp(0.625rem, 0.5106707rem + 0.487805vw, 0.9375rem) clamp(1.25rem, 1.02134141rem + 0.97561vw, 1.875rem);

      p {
        margin-bottom: 0;
      }
    }

    ol {
      margin-bottom: 1em;
      list-style: decimal;

      li {
        font-size: clamp(0.875rem, 0.82926828rem + 0.195122vw, 1rem);
        line-height: clamp(1.125rem, 1.07926828rem + 0.195122vw, 1.25rem);
        word-break: break-word;
        margin-bottom: 4px;
        margin-left: 22px;
        padding-left: 6px;
      }
    }

    ul {
      margin-bottom: 1em;
      list-style: square;

      li {
        font-size: clamp(0.875rem, 0.82926828rem + 0.195122vw, 1rem);
        line-height: clamp(1.125rem, 1.07926828rem + 0.195122vw, 1.25rem);
        word-break: break-word;
        margin-bottom: 4px;
        margin-left: 22px;
        padding-left: 6px;
      }
    }

    pre {
      overflow: auto;
      font-family: var(--font-family-secondary);
      background-color: var(--secondary-color);
      border: 2px solid rgba(var(--font-color-rgb), 0.2);
      margin: 1em 0;
      padding: 1rem clamp(1rem, 0.63414625rem + 1.560976vw, 2rem);

      code {
        color: var(--font-color);
      }
    }

    code {
      width: 100%;
      display: block;
      overflow-x: auto;
      text-align: left;
      font-family: var(--font-family-secondary);
      line-height: 1.5;
      word-spacing: normal;
      word-wrap: break-word;
      word-break: break-word;
      white-space: pre;
      color: var(--third-color);
      hyphens: none;
    }

    hr {
      margin: 2em 0;
    }

    figure {
      margin-bottom: 2em;

      figcaption {
        opacity: 0.6;
        text-align: center;
        font-size: 14px;
        font-style: italic;
      }
    }

    table {
      margin-bottom: 2em;

      thead {
        tr {
          th {
            font-weight: 700;
            background-color: rgba(var(--font-color-rgb), 0.15);
            border: 2px solid var(--font-color);
            padding: 10px 20px;
          }
        }
      }

      tbody {
        tr {
          td {
            border: 2px solid var(--font-color);
            padding: 10px 20px;
          }
        }
      }
    }

    dl {
      margin-bottom: 1em;

      dt {
        font-weight: 700;
        margin-bottom: 0.25em;
      }

      dd {
        padding-left: 20px;
      }
    }
  }

  &__metatags {
    display: flex;
    flex-direction: column;
    margin-bottom: 2em;
    row-gap: 10px;
  }

  &__category {
    opacity: 0.8;
    text-align: center;
    font-family: var(--font-family-secondary);
    font-size: 12px;
    color: var(--third-color);
    transition: color var(--transition-duration) var(--transition-timing-function);
  }

  &__date {
    display: block;
    opacity: 0.8;
    text-align: center;
    font-family: var(--font-family-secondary);
    font-size: 12px;
  }
}

@media screen and (min-width: 768px) {
  .blogPost {
    min-height: calc(100vh - 188px);
    padding-top: 180px;
  }
}
</style>

<page-query>
query blogPost ($id: ID!) {
  Post: blogPost(id: $id) {
    path
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
</page-query>

<static-query>
query {
  metadata {
   siteUrl
  }
}
</static-query>