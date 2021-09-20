<template>
  <section id="o_mnie" class="aboutMe">
    <h2 class="section_header">O mnie</h2>
    <g-image class="aboutMe__image"
             fit="contain"
             src="~/assets/images/profile.webp" />
    <div class="aboutMe__categories">
      <button v-for="category in aboutMe"
              :key="category.node.id"
              :class="{'active': active === category.node.id}"
              class="aboutMe__category"
              @click="active = category.node.id">{{ category.node.title }}
      </button>
    </div>
    <transition mode="out-in" name="fade">
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
  min-height: 100vh;
  padding: 30px 0;

  &__image {
    display: block;
    max-width: 250px;
    margin: 40px auto 50px;
    background-color: var(--primary-color);
    mix-blend-mode: luminosity;
  }

  &__categories {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    column-gap: 50px;
  }

  &__category {
    font-family: var(--font-family-secondary);
    font-size: 18px;
    line-height: 25px;
    position: relative;
    padding: 12px 22px;
    cursor: pointer;
    text-transform: capitalize;
    color: var(--font-color);
    border: none;
    outline: none;
    background: none;

    &:after {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 40px;
      height: 1px;
      content: '';
      transition: opacity 0.8s;
      transform: translateX(-50%);
      opacity: 0;
      background-color: var(--font-color);
    }

    &.active {
      &:after {
        opacity: 1;
      }
    }
  }

  &__description {
    font-family: var(--font-family-primary);
    font-size: 18px;
    font-weight: 300;
    line-height: 25px;
    max-width: 700px;
    margin: 0 auto;
    text-align: justify;
  }
}
</style>
