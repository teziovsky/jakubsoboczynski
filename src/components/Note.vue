<template>
  <div class="note">
    <p class="note__title">{{ note.title }}</p>
    <p data-aos="zoom-in" data-aos-delay="400" class="note__description">
      {{ note.description }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['note'],
  name: 'Note',
};
</script>

<style lang="scss">
@import "../global.scss";

.note {
  width: 350px;
  min-height: 150px;
  padding: 25px 20px 20px 20px;
  margin: 20px 10px 44px 10px;
  position: relative;
  color: $text-primary-color;
  background: $background-third-color;
  line-height: 1.4em;
  text-align: center;
  box-shadow: 0 4px 5px rgba($background-primary-color, 0.4);

  &:before {
    display: block;
    content: "";
    background: rgba($text-third-color, 0.5);
    width: 150px;
    height: 35px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    border-radius: 6px/18px 0;
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
  }

  &__title {
    position: absolute;
    top: -11px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba($color: $background-third-color, $alpha: 1);
    text-transform: lowercase;
    font-size: 1.1rem;
    font-weight: 500;
  }

  &__description {
    text-align: left;
    font-size: 1rem;
    font-weight: 300;
  }
}

//* Mobile breakpoints

@media screen and (max-width: 374.98px) {
  .note {
    min-height: 100px;
  }
}
</style>
