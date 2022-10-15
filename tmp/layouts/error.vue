<template>
  <transition appear mode="out-in" name="slide-bottom">
    <main class="error">
      <section class="error__wrapper">
        <template v-if="error.statusCode === 404">
          <h1 class="sectionHeader">Błąd 404</h1>
          <p class="error--info">Strona nie istnieje ¯\_(ツ)_/¯</p>
        </template>
        <template v-else>
          <h1 class="sectionHeader">Wystąpił błąd</h1>
          <p class="error--info">Spróbuj ponownie ¯\_(ツ)_/¯</p>
        </template>
        <nuxt-link :to="{ name: 'index' }" class="button">Pokaż mi drogę</nuxt-link>
      </section>
    </main>
  </transition>
</template>

<script>
export default {
  name: "Error",
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      title: "Error!",
    };
  },
};
</script>
