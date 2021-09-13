<template>
  <div class="card">
    <div
      class="card__links"
      data-aos="zoom-out-left"
      data-aos-anchor-placement="center-bottom"
      data-aos-delay="300"
    >
      <button class="card__links__item" @click="showSingle(project.image[0].url)">SCREEN</button>
      <a :href="project.source" class="card__links__item">SOURCE</a>
      <a :href="project.demo" class="card__links__item">DEMO</a>
    </div>
    <div class="card__info">
      <h3 class="card__title">{{ project.title }}</h3>
      <span class="divider"></span>
      <p class="card__description">{{ project.description }}</p>
    </div>
    <vue-easy-lightbox
      :imgs="imgs"
      :index="index"
      :visible="visible"
      @hide="handleHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox';

export default {
  name: 'Project',
  components: {
    VueEasyLightbox,
  },
  props: {
    project: {
      type: [Array, Object],
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      imgs: '',
      visible: false,
      index: 0,
    };
  },
  methods: {
    showSingle(value) {
      this.imgs = value;
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
@import '../global.scss';

button {
  font: inherit;
  color: $text-primary-color;
  border: none;

  &:hover,
  &:focus {
    cursor: pointer;
    outline: none;
  }
}

.card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  margin: 20px;

  &__links {
    display: block;
    padding: 10px 0;
    text-align: center;
    background-color: $background-secondary-color;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);

    &__item {
      font-size: 0.8rem;
      font-weight: 300;
      position: relative;
      display: block;
      margin: 12px 10px;
      padding: 6px 9px;
      transition: color 0.25s, border 0.25s ease;
      background: none;

      &::before,
      &::after {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 0;
        height: 0;
        content: '';
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
          transition: height 0.25s ease-out 0.25s, width 0.25s ease-out;
          border-top-color: $text-third-color;
          border-right-color: $text-third-color;
        }

        &::after {
          transition: height 0.25s ease-out, width 0.25s ease-out 0.25s;
          border-bottom-color: $text-third-color;
          border-left-color: $text-third-color;
        }
      }
    }
  }

  &__info {
    z-index: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 30px 20px;
    text-align: center;
    background-color: $background-third-color;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
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
    font-size: 1rem;
    font-weight: 300;
    text-align: left;
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
