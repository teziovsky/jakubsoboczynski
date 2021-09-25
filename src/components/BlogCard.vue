<template>
  <a :href="post.node.path" aria-label="test" class="blogCard">
    <div class="blogCard__wrapper">
      <g-image v-if="post.node.image.length" :src="post.node.image[0].url" alt="" class="blogCard__image" />
      <svg v-else
           class="blogCard__logo"
           fill="none"
           height="113"
           viewBox="0 0 93 113"
           width="93"
           xmlns="http://www.w3.org/2000/svg">
        <title>Logo serwisu jakubsoboczynski.pl</title>
        <path d="M46.7376 104.089V112M46.7376 112H38.0787L24.3421 91.3683L2 73.516L10.6055 56.5724M46.7376 112H55.2896L69.0262 91.3683L91.3683 73.516L82.7629 56.5724M10.6055 56.5724L8.89505 2L10.6055 2.05345L38.0787 30.0078M10.6055 56.5724L38.0787 30.0078M10.6055 56.5724L46.7376 78.1127M82.7629 56.5724L46.7376 78.1127M82.7629 56.5724L84.4733 2.00001H82.7629L55.2896 30.0078M82.7629 56.5724L55.2896 30.0078M38.0787 30.0078H46.7376M46.7376 78.1127L55.436 51.9757M46.7376 78.1127L38.0569 52.0292M46.7376 30.0078L35.5666 44.5462L38.0569 52.0292M46.7376 30.0078L57.9086 44.5462L55.436 51.9757M46.7376 30.0078H55.2896M55.436 51.9757L46.7376 40.6978L38.0569 52.0292M66.1399 66.4072H74.0505L67.5296 72.1263L54.274 73.8902L65.1778 67.1555M27.5491 66.4072H19.6385L26.1594 72.1263L39.415 73.8902L28.5112 67.1555L27.5491 66.4072Z"
              stroke="white"
              stroke-width="2" />
      </svg>
    </div>
    <div class="blogCard__content">
      <div class="blogCard__metatags">
        <span class="blogCard__category">{{ post.node.category }}</span>
        <span class="blogCard__date">{{ post.node.date }}</span>
      </div>
      <h2 class="blogCard__title">{{ post.node.title }}</h2>
      <p class="blogCard__short">{{ post.node.short }}</p></div>
  </a>
</template>

<script>
export default {
  props: {
    post: Object,
  },
  name: 'BlogCard',
};
</script>

<style lang="scss" scoped>
.blogCard {
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  background-color: var(--secondary-color);

  &__wrapper {
    @include flex-center;
  }

  &__image {

  }

  &__logo {

  }

  &__content {
    padding: 20px 20px 30px;
  }

  &__metatags {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    margin-bottom: 15px;
  }

  &__category {
    font-family: var(--font-family-secondary);
    color: var(--third-color);
  }

  &__date {
    opacity: 0.65;
    font-family: var(--font-family-primary);
  }

  &__title {
    font-family: var(--font-family-primary);
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 10px;
  }

  &__short {
    font-family: var(--font-family-primary);
    font-size: 14px;
    line-height: 18px;
  }
}
</style>