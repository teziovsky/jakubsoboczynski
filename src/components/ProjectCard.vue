<template>
  <div class="projectCard">
    <h3 class="projectCard__title">{{ project.title }}</h3>
    <g-image :alt="project.image_alt" :src="project.image[0].url" class="projectCard__image" />
    <a :href="project.source" class="projectCard__source" rel="nofollow noopener" target="_blank">
      <svg fill="none"
           height="38"
           viewBox="0 0 35 38"
           width="35"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M24.3036 36.9374V30.4957C24.366 29.7019 24.2588 28.904 23.989 28.155C23.7193 27.4059 23.2931 26.7228 22.7389 26.1512C27.9656 25.5686 33.4586 23.5878 33.4586 14.4994C33.4582 12.1754 32.5642 9.94055 30.9618 8.25736C31.7206 6.22414 31.6669 3.97674 30.812 1.98204C30.812 1.98204 28.8478 1.39945 24.3036 4.44556C20.4885 3.41158 16.4669 3.41158 12.6518 4.44556C8.1076 1.39945 6.14344 1.98204 6.14344 1.98204C5.28849 3.97674 5.23484 6.22414 5.99363 8.25736C4.37923 9.95303 3.48437 12.2081 3.49682 14.5493C3.49682 23.5712 8.98981 25.552 14.2165 26.2011C13.6688 26.767 13.2465 27.4419 12.9769 28.1818C12.7073 28.9217 12.5966 29.7101 12.6518 30.4957V36.9374M12.6518 31.9438C4.32909 34.4406 4.32909 27.7825 1 26.9502L12.6518 31.9438Z"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2" />
      </svg>
    </a>
    <div class="projectCard__info">
      <p class="projectCard__description">{{ project.description }}</p>
      <p class="projectCard__technologies">{{ project.technologies|splitArray(' ') }}</p>
    </div>
    <a :href="project.demo" class="projectCard__demo" rel="nofollow noopener" target="_blank">
      <svg fill="none"
           height="24"
           viewBox="0 0 24 24"
           width="24"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M1.58337 22.4166L22.4167 1.58331M22.4167 1.58331H1.58337M22.4167 1.58331V22.4166"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.91667" />
      </svg>
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
    splitArray(value, join) {
      return value.split(',').join(join);
    },
  },
};
</script>

<style lang="scss" scoped>
.projectCard {
  position: relative;
  max-width: 600px;
  margin: 60px auto;
  padding-bottom: 40px;

  &__title {
    font-family: var(--font-family-secondary);
    font-size: 24px;
    font-weight: 400;
    line-height: 26px;
    margin-bottom: 30px;
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
    width: 25px;
    height: 25px;

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
    position: relative;
    margin-bottom: 15px;
    padding-bottom: 15px;
    text-align: center;

    &:after {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 40px;
      height: 1px;
      content: '';
      transform: translateX(-50%);
      background-color: var(--font-color);
    }
  }

  &__technologies {
    font-family: var(--font-family-primary);
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    text-align: center;
  }

  &__demo {
    position: absolute;
    right: 0;
    bottom: 5px;
    display: block;
    width: 15px;
    height: 15px;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>