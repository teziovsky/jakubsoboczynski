<template>
  <section id="kontakt" class="contact">
    <h2 class="section_header">Kontakt</h2>
    <h3 class="contact__title">{{ contact[0].node.title }}</h3>
    <p class="contact__description">{{ contact[0].node.description }}</p>
    <a class="button button--contact" href="mailto:kontakt@jakubsoboczynski.pl" rel="noopener nofollow" target="_blank">
      Cześć
    </a>
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
    font-family: var(--font-family-primary);
    font-size: 24px;
    font-weight: 200;
    line-height: 24px;
    margin: 50px 0 30px;
    text-align: center;
  }

  &__description {
    font-family: var(--font-family-primary);
    font-size: 18px;
    font-weight: 200;
    line-height: 24px;
    max-width: 700px;
    margin: 0 auto 30px;
  }
}

.button--contact {
  margin: 0 auto;
}
</style>
