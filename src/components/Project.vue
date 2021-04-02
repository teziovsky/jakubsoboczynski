<template>
  <div class="card">
    <div
      data-aos="zoom-out-left"
      data-aos-delay="300"
      data-aos-anchor-placement="center-bottom"
      class="card__links"
    >
      <button class="card__links__item" @click="showSingle(project.image)">SCREEN</button>
      <a :href="project.github_link" class="card__links__item">SOURCE</a>
      <a class="card__links__item" :href="project.demo_link">DEMO</a>
    </div>
    <div class="card__info">
      <h3 class="card__title">{{ project.title }}</h3>
      <span class="divider"></span>
      <p class="card__description">{{ project.description }}</p>
    </div>
    <vue-easy-lightbox
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="handleHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox';

export default {
  props: ['project'],
  name: 'Project',
  components: {
    VueEasyLightbox,
  },
  data() {
    return {
      imgs: '',
      visible: false,
      index: 0,
    };
  },
  methods: {
    showSingle(name) {
      this.imgs = require(`../assets/projects/${name}.png`);
      this.show();
    },
    show() {
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../global.scss";

button {
  color: $text-primary-color;
  border: none;
  font: inherit;

  &:hover,
  &:focus {
    cursor: pointer;
    outline: none;
  }
}

.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 500px;
  margin: 20px;

  &__links {
    display: block;
    background-color: $background-secondary-color;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    text-align: center;
    padding: 10px 0;

    &__item {
      display: block;
      font-size: 0.8rem;
      font-weight: 300;
      padding: 6px 9px;
      margin: 12px 10px;
      background: none;
      transition: color 0.25s, border 0.25s ease;
      position: relative;

      &::before,
      &::after {
        display: block;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border: 1px solid transparent;
      }

      &:hover,
      &:focus {
        color: $text-third-color;

        &::before,
        &::after {
          width: 100%;
          height: 100%;
        }

        &::before {
          border-top-color: $text-third-color;
          border-right-color: $text-third-color;
          transition: height 0.25s ease-out 0.25s, width 0.25s ease-out;
        }

        &::after {
          border-bottom-color: $text-third-color;
          border-left-color: $text-third-color;
          transition: height 0.25s ease-out, width 0.25s ease-out 0.25s;
        }
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    background-color: $background-third-color;
    padding: 30px 20px;
    z-index: 1;
  }

  &__screen {
    width: 350px;
    height: auto;
  }

  &__title {
    font-size: 1.4rem;
    font-weight: 500;
    font-variant: small-caps;
  }

  &__description {
    text-align: left;
    font-size: 1rem;
    font-weight: 300;
  }
}

//* Mobile breakpoints

@media screen and (max-width: 767.98px) {
  .card {
    width: 100%;
    max-width: 500px;

    &__title {
      font-size: 1.3rem;
    }
  }
}

@media screen and (max-width: 374.98px) {
  .card {
    &__title {
      font-size: 1.1rem;
    }
  }
}
</style>
