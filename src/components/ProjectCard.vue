<template>
  <div class="projectCard">
    <h3 v-if="project.title" class="projectCard__title">{{ project.title }}</h3>
    <div v-if="project.image[0].url" class="projectCard__wrapper">
      <g-image :alt="project.imageAlt" :src="project.image[0].url" class="projectCard__image" />
    </div>
    <a
      v-if="project.source"
      :aria-label="'Przejdź do plików źródłowych projektu - ' + project.title"
      :href="project.source"
      class="projectCard__source"
      rel="noreferrer nofollow noopener"
      target="_blank">
      <svg fill="none" height="38" viewBox="0 0 35 38" width="35" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24.3036 36.9374V30.4957C24.366 29.7019 24.2588 28.904 23.989 28.155C23.7193 27.4059 23.2931 26.7228 22.7389 26.1512C27.9656 25.5686 33.4586 23.5878 33.4586 14.4994C33.4582 12.1754 32.5642 9.94055 30.9618 8.25736C31.7206 6.22414 31.6669 3.97674 30.812 1.98204C30.812 1.98204 28.8478 1.39945 24.3036 4.44556C20.4885 3.41158 16.4669 3.41158 12.6518 4.44556C8.1076 1.39945 6.14344 1.98204 6.14344 1.98204C5.28849 3.97674 5.23484 6.22414 5.99363 8.25736C4.37923 9.95303 3.48437 12.2081 3.49682 14.5493C3.49682 23.5712 8.98981 25.552 14.2165 26.2011C13.6688 26.767 13.2465 27.4419 12.9769 28.1818C12.7073 28.9217 12.5966 29.7101 12.6518 30.4957V36.9374M12.6518 31.9438C4.32909 34.4406 4.32909 27.7825 1 26.9502L12.6518 31.9438Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2" />
      </svg>
    </a>
    <div v-if="project.description || project.technologies" class="projectCard__info">
      <p v-if="project.description" class="projectCard__description">{{ project.description }}</p>
      <p v-if="project.technologies" class="projectCard__technologies">
        {{ project.technologies | splitString(",", "   ") }}
      </p>
    </div>
    <a
      v-if="project.demo"
      :aria-label="'Przejdź do prezentacji projektu - ' + project.title"
      :href="project.demo"
      class="projectCard__demo"
      rel="noreferrer nofollow noopener"
      target="_blank">
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.58337 22.4166L22.4167 1.58325M22.4167 1.58325H1.58337M22.4167 1.58325V22.4166"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2" />
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    project: Object,
  },
};
</script>

<style lang="scss" scoped>
.projectCard {
  position: relative;
  max-width: 550px;
  margin: 0 auto 60px;
  padding-bottom: 40px;

  &__title {
    text-align: center;
    font-family: var(--font-family-secondary);
    font-size: 24px;
    line-height: 26px;
    font-weight: 400;
    margin-bottom: 30px;
  }

  &__wrapper {
    position: relative;
    @include image-overlay;
  }

  &__image {
    width: 100%;
    display: block;
  }

  &__source {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 32px;
    height: 32px;
    display: block;
    padding: 5px;
    transition: transform var(--transition-duration) var(--transition-timing-function);

    @include hover {
      transform: scale(1.12) translateY(5px);

      path {
        stroke: var(--third-color);
      }
    }

    svg {
      width: 22px;
      height: 22px;

      path {
        transition: stroke var(--transition-duration) var(--transition-timing-function);
        stroke: var(--font-color);
      }
    }
  }

  &__info {
    position: relative;
    z-index: 1;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--secondary-color);
    padding: clamp(0.625rem, 0.16768281rem + 1.95122vw, 1.875rem) clamp(1.25rem, 0.79268281rem + 1.95122vw, 2.5rem);
    transition: background var(--transition-duration) var(--transition-timing-function);
  }

  &__description {
    text-align: center;
    font-size: clamp(0.75rem, 0.70426828rem + 0.195122vw, 0.875rem);
    line-height: 18px;
    font-weight: 600;
  }

  &__technologies {
    position: relative;
    opacity: 0.8;
    text-align: center;
    font-size: clamp(0.625rem, 0.57926828rem + 0.195122vw, 0.75rem);
    line-height: 18px;
    font-weight: 400;
    margin-top: 15px;
    padding-top: 15px;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 40px;
      height: 1px;
      background-color: var(--font-color);
      transform: translateX(-50%);
      transition: background var(--transition-duration) var(--transition-timing-function);
    }
  }

  &__demo {
    position: absolute;
    right: 0;
    bottom: 5px;
    width: 27px;
    height: 27px;
    display: block;
    padding: 5px;
    transition: transform var(--transition-duration) var(--transition-timing-function);

    @include hover {
      transform: scale(1.12) translateY(5px);

      path {
        stroke: var(--third-color);
      }
    }

    svg {
      width: 17px;
      height: 17px;

      path {
        transition: stroke var(--transition-duration) var(--transition-timing-function);
        stroke: var(--font-color);
      }
    }
  }
}

@media screen and (min-width: 425px) {
  .projectCard {
    &__info {
      position: absolute;
      right: 50px;
      bottom: -5px;
      left: 50px;
    }
  }
}
</style>
