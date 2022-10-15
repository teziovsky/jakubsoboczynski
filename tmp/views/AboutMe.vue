<template>
  <section v-if="aboutMe.length" id="o_mnie" class="aboutMe">
    <h2 class="sectionHeader">O mnie</h2>
    <div class="aboutMe__wrapper">
      <img
        v-if="aboutMePicture.length"
        :src="aboutMePicture[0].image"
        alt="Moje zdjęcie profilowe"
        class="aboutMe__image"
        loading="lazy" />
    </div>
    <div class="aboutMe__categories">
      <button
        v-for="category in aboutMe"
        :key="category.sort"
        :aria-label="'Wyświetl treść kategorii - ' + category.title"
        :class="{ active: active === category.sort }"
        class="aboutMe__category"
        @click="active = category.sort">
        {{ category.title }}
      </button>
    </div>
    <transition mode="out-in" name="shrink">
      <p v-if="selectedDescription" :key="selectedDescription.sort" class="aboutMe__description">
        {{ selectedDescription.description }}
      </p>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AboutMe",
  props: {
    aboutMe: {
      type: Array,
      required: true,
    },
    aboutMePicture: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      active: 1,
    };
  },
  computed: {
    selectedDescription() {
      if (this.aboutMe.length && this.active) return this.aboutMe.find((item) => item.sort === this.active);
      return {};
    },
  },
  mounted() {
    this.active = this.aboutMe?.[0]?.sort;
  },
};
</script>
