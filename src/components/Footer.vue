<template>
  <footer class="footer">
    <g-image alt="`Element dekoracyjny – separator stopki`"
             ariahidden="true"
             class="footer__separator"
             src="~/assets/images/icons/footerSeparator.webp" />
    <SocialLinks />
    <div class="footer__copyrights">
      <p>© 2021
        <a class="link" href="https://www.github.com/teziovsky" rel="nofollow noopener" target="_blank">Jakub
          Soboczyński
        </a>
      </p>
      <g-image alt="`Element dekoracyjny – diament`"
               ariahidden="true"
               class="footer__diamant"
               src="~/assets/images/icons/diamant.webp" />
      <p>Wszelkie prawa zastrzeżone</p>
    </div>
  </footer>
</template>

<script>
import SocialLinks from '~/components/SocialLinks.vue';

export default {
  name: 'Footer',
  components: {
    SocialLinks,
  },
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 70px;

  &__separator {
    width: 18px;
    margin: 0 7px 25px 0;
  }

  .socialLinks {
    position: static;
    top: unset;
    left: unset;
    display: flex;
    flex-direction: row;
    margin-bottom: 25px;
    transform: none;
    row-gap: unset;
    column-gap: 40px;
  }

  &__copyrights {
    font-family: var(--font-family-primary);
    font-size: 14px;
    font-weight: 200;
    line-height: 14px;
    display: flex;
    align-items: center;
  }

  &__diamant {
    width: 13px;
    margin: 0 20px;
  }
}

@media screen and (min-width: 768px) {
  .footer {
    .socialLinks {
      display: none;
    }
  }
}
</style>