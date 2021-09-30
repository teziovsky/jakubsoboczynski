<template>
  <section v-if="contact.length" id="kontakt" class="contact">
    <h2 class="sectionHeader">Kontakt</h2>
    <p class="contact__description" v-html="contact[0].node.description"></p>
    <div class="contact__button">
      <a aria-label="Wyślij e-maila na adres kontakt@jakubsoboczynski.pl"
         class="button"
         href="mailto:kontakt@jakubsoboczynski.pl"
         rel="noreferrer nofollow noopener"
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

  &__description {
    max-width: 700px;
    text-align: center;
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
