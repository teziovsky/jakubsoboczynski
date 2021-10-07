<template>
  <Layout>
    <section id="error" class="error">
      <h1 class="sectionHeader">Błąd 404</h1>
      <p class="error--info">Strona nie istnieje ¯\_(ツ)_/¯</p>
    </section>
  </Layout>
</template>

<script>
export default {
  name: '404',
};
</script>

<style lang="scss" scoped>
.error {
  min-height: calc(100vh - 230px);
  padding-top: 180px;

  &--info {
    text-align: center;
    font-size: 32px;
  }
}

@media screen and (min-width: 768px) {
  .error {
    min-height: calc(100vh - 200px);
  }
}
</style>