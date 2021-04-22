<template>
  <div class="card">
    <div
      class="card__image"
      data-aos="zoom-out-right"
      data-aos-anchor-placement="center-bottom"
      data-aos-duration="1000"
    >
      <img
        :src="require('../assets/technologies/' + technology.image + '.svg')"
        alt="html"
        height="auto"
        width="100%"
      />
    </div>
    <div class="card__info">
      <h3 class="card__title">{{ technology.name }}</h3>
      <span class="divider"></span>
      <p class="card__description">{{ technology.subtitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['technology'],
  name: 'Technology',
};
</script>

<style lang="scss" scoped>
@import '../global.scss';

.card {
  position: relative;
  display: flex;
  width: 500px;
  margin: 20px;

  &__image {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 130px;
    height: 130px;
    background-color: $background-secondary-color;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);

    &.aos-animate {
      transform: translateY(-50%) !important;
    }

    & > img {
      max-width: 80%;
      height: 80%;
    }
  }

  &__info {
    font-size: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 150px;
    margin-left: 115px;
    padding: 20px 20px 20px 25px;
    background-color: $background-third-color;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
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

    &__image {
      width: 120px;
      height: 120px;
    }

    &__info {
      min-width: 200px;
      margin-left: 105px;
    }

    &__title {
      font-size: 1.3rem;
    }
  }
}

@media screen and (max-width: 419.98px) {
  .card {
    &__image {
      width: 100px;
      height: 100px;
    }

    &__info {
      margin-left: 85px;
    }
  }
}

@media screen and (max-width: 374.98px) {
  .card {
    &__image {
      width: 90px;
      height: 90px;
    }

    &__info {
      margin-left: 75px;
    }

    &__title {
      font-size: 1.1rem;
    }
  }
}
</style>
