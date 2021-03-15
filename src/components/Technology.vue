<template>
  <div class="card">
    <div
      data-aos="zoom-out-right"
      data-aos-duration="1000"
      data-aos-anchor-placement="center-bottom"
      class="card__image"
    >
      <img
        :src="require('../assets/technologies/' + technology.image + '.png')"
        alt="html"
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
  props: ["technology"],
  name: "Technology",
};
</script>

<style lang="scss" scoped>
@import "../global.scss";

.card {
  display: flex;
  position: relative;
  width: 500px;
  margin: 20px;

  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 130px;
    background-color: $background-secondary-color;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1;

    &.aos-animate {
      transform: translateY(-50%) !important;
    }

    & > img {
      max-width: 80%;
      height: 80%;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: $background-third-color;
    min-height: 150px;
    width: 100%;
    margin-left: 115px;
    padding: 20px 20px 20px 25px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    font-size: 1rem;
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
      height: 120px;
      width: 120px;
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
      height: 100px;
      width: 100px;
    }

    &__info {
      margin-left: 85px;
    }
  }
}

@media screen and (max-width: 374.98px) {
  .card {
    &__image {
      height: 90px;
      width: 90px;
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