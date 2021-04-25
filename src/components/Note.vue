<template>
  <div class="note">
    <p class="note__title">{{ note.title }}</p>
    <p class="note__description" data-aos="zoom-in" data-aos-delay="400">
      {{ note.description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Note',
  props: {
    note: {
      type: [Array, Object],
      default: function () {
        return {};
      },
    },
  },
};
</script>

<style lang="scss">
@import '../global.scss';

.note {
  line-height: 1.4em;
  position: relative;
  width: 350px;
  min-height: 150px;
  margin: 20px 10px 44px 10px;
  padding: 25px 20px 20px 20px;
  text-align: center;
  color: $text-primary-color;
  background: $background-third-color;
  box-shadow: 0 4px 5px rgba($background-primary-color, 0.4);

  &:before {
    position: absolute;
    top: -18px;
    left: 50%;
    display: block;
    width: 150px;
    height: 35px;
    content: '';
    transform: translateX(-50%);
    border-radius: 6px/18px 0;
    background: rgba($text-third-color, 0.5);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  }

  &__title {
    font-size: 1.1rem;
    font-weight: 500;
    position: absolute;
    top: -11px;
    left: 50%;
    transform: translateX(-50%);
    text-transform: lowercase;
    color: rgba($color: $background-third-color, $alpha: 1);
  }

  &__description {
    font-size: 1rem;
    font-weight: 300;
    text-align: left;
  }
}

//* Mobile breakpoints

@media screen and (max-width: 374.98px) {
  .note {
    min-height: 100px;
  }
}
</style>
