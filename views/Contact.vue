<template>
  <section v-if="contact.length" id="kontakt" class="contact">
    <h2 class="sectionHeader">Kontakt</h2>
    <p class="contact__description">
      {{ contact[0].description }}
    </p>
    <div class="contact__button">
      <a
        aria-label="Wyślij e-maila na adres jakub.soboczynski@icloud.com"
        class="button"
        href="mailto:jakub.soboczynski@icloud.com"
        rel="noreferrer nofollow noopener"
        target="_blank">
        Cześć
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: "Contact",
  props: {
    contact: {
      type: Array,
      required: true,
    },
  },
};
</script>
