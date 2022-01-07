<template>
  <section v-if="aboutMe.length" id="o_mnie" class="aboutMe">
    <h2 class="sectionHeader">O mnie</h2>
    <div class="aboutMe__wrapper">
      <g-image
        alt="Moje zdjęcie profilowe"
        class="aboutMe__image"
        src="../assets/images/profile.webp" />
    </div>
    <div class="aboutMe__categories">
      <button
        v-for="category in aboutMe"
        :key="category.node.id"
        :aria-label="'Wyświetl treść kategorii - ' + category.node.title"
        :class="{'active': active === category.node.id}"
        class="aboutMe__category"
        @click="active = category.node.id">{{ category.node.title }}
      </button>
    </div>
    <transition mode="out-in" name="shrink">
      <p
        v-if="selectedDescription"
        :key="selectedDescription.node.id"
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
      if (this.aboutMe.length && this.active) return this.aboutMe.find(item => item.node.id === this.active);
    },
  },
  mounted() {
    this.active = this.aboutMe[0].node.id;
  },
};
</script>

<style lang="scss" scoped>
.aboutMe {
  padding: 100px 0;

  &__wrapper {
    position: relative;
    @include image-overlay;
    margin-bottom: 30px;
  }

  &__image {
    max-width: clamp(12.5rem, 11.35670727rem + 4.878049vw, 15.625rem);
    display: block;
    margin: 0 auto;
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
    transition: box-shadow var(--transition-duration) var(--transition-timing-function), color var(--transition-duration) var(--transition-timing-function);

    @include hover {
      color: var(--third-color);
      box-shadow: inset 0 0 20px rgba(var(--third-color-rgb), 0.5);
    }

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: calc(80% - 44px);
      height: 1px;
      opacity: 0;
      background-color: var(--third-color);
      transform: translateX(-50%);
      transition: opacity 0.8s var(--transition-timing-function), background var(--transition-duration) var(--transition-timing-function);
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
