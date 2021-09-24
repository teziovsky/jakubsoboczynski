<template>
  <section id="o_mnie" class="aboutMe">
    <h2 class="section_header">O mnie</h2>
    <div class="aboutMe__wrapper">
      <g-image class="aboutMe__image"
               fit="contain"
               src="~/assets/images/profile.webp" />
    </div>
    <div class="aboutMe__categories">
      <button v-for="category in aboutMe"
              :key="category.node.id"
              :class="{'active': active === category.node.id}"
              class="aboutMe__category"
              @click="active = category.node.id">{{ category.node.title }}
      </button>
    </div>
    <transition mode="out-in" name="shrink">
      <p :key="selectedDescription.node.id"
         class="aboutMe__description"
         v-html="selectedDescription.node.description"></p>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AboutMe',
  props: {
    aboutMe: Array,
  },
  data() {
    return {
      active: '1',
    };
  },
  computed: {
    selectedDescription() {
      if (this.aboutMe?.length) return this.aboutMe.find(item => item.node.id === this.active);
    },
  },
};
</script>

<style lang="scss" scoped>
.aboutMe {
  padding: 100px 0;

  &__wrapper {
    position: relative;
    @include image-overlay;
  }

  &__image {
    max-width: clamp(12.5rem, 11.35670727rem + 4.878049vw, 15.625rem);
    display: block;
    margin: clamp(1.875rem, 1.64634141rem + 0.97561vw, 2.5rem) auto clamp(1.875rem, 1.41768281rem + 1.95122vw, 3.125rem);
  }

  &__categories {
    @include flex-center;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 20px;
    column-gap: 30px;
    row-gap: 15px;
  }

  &__category {
    position: relative;
    font-family: var(--font-family-secondary);
    font-size: 18px;
    line-height: 25px;
    text-transform: capitalize;
    color: var(--font-color);
    padding: 12px 22px;

    @include hover {

    }

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 40px;
      height: 1px;
      opacity: 0;
      background-color: var(--font-color);
      transform: translateX(-50%);
      transition: opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1);
    }

    &.active {
      &:after {
        opacity: 1;
      }
    }
  }

  &__description {
    max-width: 700px;
    text-align: center;
    font-family: var(--font-family-primary);
    font-size: 18px;
    line-height: 25px;
    font-weight: 300;
    margin: 0 auto;
  }
}

@media screen and (min-width: 768px) {
  .aboutMe {
    &__categories {
      flex-direction: row;
    }

    &__description {
      text-align: justify;
    }
  }
}
</style>
