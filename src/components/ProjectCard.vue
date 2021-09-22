<template>
  <div class="projectCard">
    <h3 v-if="project.title" class="projectCard__title">{{ project.title }}</h3>
    <g-image v-if="project.image[0].url"
             :alt="project.image_alt"
             :src="project.image[0].url"
             class="projectCard__image" />
    <a v-if="project.source" :href="project.source" class="projectCard__source" rel="nofollow noopener" target="_blank">
      <g-image :alt="`Zobacz projekt ${project.title} w serwisie Github`" src="~/assets/images/icons/github.webp" />
    </a>
    <div v-if="project.description || project.technologies" class="projectCard__info">
      <p v-if="project.description" class="projectCard__description">{{ project.description }}</p>
      <p v-if="project.technologies" class="projectCard__technologies">{{ project.technologies|splitString(' ') }}</p>
    </div>
    <a v-if="project.demo" :href="project.demo" class="projectCard__demo" rel="nofollow noopener" target="_blank">
      <g-image :alt="`Zobacz projekt ${project.title} w akcji`" src="~/assets/images/icons/demo.webp" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    project: Object,
  },
  name: 'ProjectCard',
  filters: {
    splitString(value, join) {
      return value.split(',').join(join);
    },
  },
};
</script>

<style lang="scss" scoped>
.projectCard {
  position: relative;
  max-width: 500px;
  margin: 60px auto;
  padding-bottom: 40px;

  &__title {
    font-family: var(--font-family-secondary);
    font-size: 24px;
    font-weight: 400;
    line-height: 26px;
    margin-bottom: 30px;
    text-align: center;
  }

  &__image {
    display: block;
    width: 100%;
    background-color: var(--primary-color);
    mix-blend-mode: luminosity;
  }

  &__source {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 35px;
    height: 35px;
    padding: 5px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__info {
    position: absolute;
    right: 50px;
    bottom: -5px;
    left: 50px;
    padding: 30px 40px;
    background-color: var(--secondary-color);
  }

  &__description {
    font-family: var(--font-family-primary);
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    text-align: center;
  }

  &__technologies {
    font-family: var(--font-family-primary);
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    position: relative;
    margin-top: 15px;
    padding-top: 15px;
    text-align: center;

    &:before {
      position: absolute;
      top: 0;
      left: 50%;
      width: 40px;
      height: 1px;
      content: '';
      transform: translateX(-50%);
      background-color: var(--font-color);
    }
  }

  &__demo {
    position: absolute;
    right: 0;
    bottom: 5px;
    display: block;
    width: 27px;
    height: 27px;
    padding: 5px;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>