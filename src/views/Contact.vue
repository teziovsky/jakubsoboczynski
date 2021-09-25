<template>
  <section id="kontakt" class="contact">
    <h2 class="section_header">Kontakt</h2>
    <h3 class="contact__title">{{ contact[0].node.title }}</h3>
    <p class="contact__description">{{ contact[0].node.description }}</p>
    <div class="contact__button">
      <a class="button" href="mailto:kontakt@jakubsoboczynski.pl" rel="noopener nofollow" target="_blank">
        Cześć
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    contact: Array,
  },
};
</script>

<style lang="scss" scoped>
.contact {
  padding: 50px 0 150px;

  &__title {
    text-align: center;
    font-family: var(--font-family-primary);
    font-size: 24px;
    line-height: 24px;
    font-weight: 200;
    margin: 50px 0 30px;
  }

  &__description {
    max-width: 700px;
    text-align: center;
    font-family: var(--font-family-primary);
    font-size: 18px;
    line-height: 24px;
    font-weight: 200;
    margin: 0 auto 30px;
  }

  &__button {
    @include flex-center;
  }
}
</style>
