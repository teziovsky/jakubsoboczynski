<template>
  <section id="kontakt" class="contact">
    <h2 class="sectionHeader">Kontakt</h2>
    <h3 class="contact__title">{{ contact[0].node.title }}</h3>
    <p class="contact__description">{{ contact[0].node.description }}</p>
    <div class="contact__button">
      <a aria-label="Wyślij e-maila na adres kontakt@jakubsoboczynski.pl"
         class="button"
         href="mailto:kontakt@jakubsoboczynski.pl"
         rel="noopener nofollow"
         target="_blank">
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
  padding: 50px 0 clamp(3.75rem, 2.83536586rem + 3.902439vw, 6.25rem);

  &__title {
    text-align: center;
    font-family: var(--font-family-primary);
    font-size: 24px;
    line-height: 24px;
    font-weight: 200;
    margin-bottom: 30px;
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
