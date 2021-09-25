<template>
  <footer class="footer">
    <svg class="footer__separator"
         fill="none"
         height="11"
         viewBox="0 0 17 11"
         width="17"
         xmlns="http://www.w3.org/2000/svg">
      <title>Ikona separatora stopki</title>
      <path d="M0 4.69308L1.47018 4.76979C1.61081 2.92888 2.96591 1.84223 4.78125 1.85501C6.07244 1.85501 6.92899 2.4303 8.05399 3.26126C9.35796 4.27121 10.4702 4.9999 12.0554 4.9999C14.3693 5.01269 16.3764 3.54252 16.7088 0.793935L15.2386 0.65331C14.983 2.41752 13.7173 3.54251 12.0426 3.54251C10.9048 3.52973 10.125 3.00558 9.03836 2.1874C7.7216 1.17746 6.5071 0.397629 4.75568 0.384845C2.27556 0.37206 0.178977 1.90615 0 4.69308Z"
            fill="white" />
      <path d="M0 10.6931L1.47018 10.7698C1.61081 8.92888 2.96591 7.84223 4.78125 7.85501C6.07244 7.85501 6.92899 8.4303 8.05399 9.26126C9.35796 10.2712 10.4702 10.9999 12.0554 10.9999C14.3693 11.0127 16.3764 9.54251 16.7088 6.79393L15.2386 6.65331C14.983 8.41751 13.7173 9.54251 12.0426 9.54251C10.9048 9.52973 10.125 9.00558 9.03836 8.1874C7.7216 7.17746 6.5071 6.39763 4.75568 6.38484C2.27556 6.37206 0.178977 7.90615 0 10.6931Z"
            fill="white" />
    </svg>
    <SocialLinks />
    <div class="footer__copyrights">
      <p>© {{ actualYear }}
        <a aria-label="Przejdź do konta w serwisie GitHub.pl"
           class="link"
           href="https://www.github.com/teziovsky"
           rel="nofollow noopener"
           target="_blank">Jakub
          Soboczyński
        </a>
      </p>
      <svg class="footer__diamant"
           fill="none"
           height="62"
           viewBox="0 0 29 62"
           width="29"
           xmlns="http://www.w3.org/2000/svg">
        <title>Ikona separatora praw autorskich</title>
        <path d="M24.2716 27.66L14.5216 57L4.79141 27.72M24.2716 27.66L27.0431 19.32L14.5216 3L2 19.32L4.79141 27.72M24.2716 27.66L14.5216 15L4.79141 27.72"
              stroke="white"
              stroke-width="3" />
      </svg>
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
  computed: {
    actualYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  @include flex-center;
  flex-direction: column;
  padding: 50px 0 50px;

  &__separator {
    width: 18px;
    margin: 0 7px 15px 0;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: var(--font-family-primary);
    font-size: 14px;
    line-height: 14px;
    font-weight: 200;
    row-gap: 10px;
  }

  &__diamant {
    width: 13px;
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .footer {
    .socialLinks {
      display: none;
    }

    &__copyrights {
      flex-direction: row;
      row-gap: unset;
      column-gap: 20px;
    }

    &__diamant {
      display: block;
    }
  }
}
</style>