<template>
  <footer class="footer">
    <p class="footer__separator">
      ~
      <br />
      ~
    </p>
    <p class="footer__copy">&copy; 2020 | Designed by Jakub Soboczyński</p>
    <ul class="footer__links">
      <li
        v-for="(link, index) in social_links"
        :key="link.href"
        :data-aos-delay="(index + 1) * 200"
        class="footer__links__item"
        data-aos="flip-left"
        data-aos-anchor-placement="top-bottom"
      >
        <a :alt="link.name" :href="link.href" :name="link.name">
          <svg
            fill="none"
            height="36"
            viewBox="0 0 36 36"
            width="36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path :d="link.svg_path_d" :fill="link.svg_path_fill" />
          </svg>
          <span class="sr-only">{{ link.name }}</span>
        </a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      social_links: [
        {
          id: 1,
          name: 'Github',
          href: 'https://github.com/teziovsky',
          svg_path_d:
            'M0 0V36H36V0H0ZM21.801 29.385C21.192 29.502 21 29.1285 21 28.809V25.5165C21 24.396 20.607 23.667 20.175 23.295C22.848 22.998 25.656 21.9825 25.656 17.3745C25.656 16.0635 25.1895 14.9925 24.42 14.154C24.5445 13.851 24.9555 12.63 24.3015 10.9785C24.3015 10.9785 23.295 10.656 21.0045 12.2085C20.046 11.9385 19.02 11.808 18 11.802C16.98 11.8065 15.954 11.9385 14.9955 12.2055C12.7035 10.653 11.6955 10.9755 11.6955 10.9755C11.0445 12.6285 11.4555 13.848 11.58 14.1525C10.812 14.9925 10.344 16.062 10.344 17.373C10.344 21.969 13.1445 22.9995 15.8115 23.304C15.468 23.604 15.1575 24.132 15.0495 24.909C14.364 25.215 12.6285 25.7445 11.5575 23.91C11.5575 23.91 10.923 22.758 9.717 22.6725C9.717 22.6725 8.547 22.6575 9.6345 23.403C9.6345 23.403 10.422 23.772 10.968 25.158C10.968 25.158 11.6625 27.3 15 26.574V28.8075C15 29.124 14.8065 29.496 14.208 29.385C9.438 27.7995 6 23.301 6 18C6 11.3715 11.373 6 18 6C24.627 6 30 11.3715 30 18C30 23.2995 26.5665 27.7965 21.801 29.385Z',
          svg_path_fill: '#D4D4DC',
        },
        {
          id: 2,
          name: 'Linkedin',
          href: 'https://pl.linkedin.com/in/jakubsoboczynski',
          svg_path_d:
            'M0 0V36H36V0H0ZM12 28.5H7.5V12H12V28.5ZM9.75 10.098C8.301 10.098 7.125 8.913 7.125 7.452C7.125 5.991 8.301 4.806 9.75 4.806C11.199 4.806 12.375 5.991 12.375 7.452C12.375 8.913 11.2005 10.098 9.75 10.098ZM30 28.5H25.5V20.094C25.5 15.042 19.5 15.4245 19.5 20.094V28.5H15V12H19.5V14.6475C21.5955 10.7685 30 10.482 30 18.3615V28.5Z',
          svg_path_fill: '#D4D4DC',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../global.scss';

.footer {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__separator {
    font-size: 2rem;
    line-height: 20%;
    margin-top: 30px;
  }

  &__copy {
    font-size: 0.8rem;
    font-weight: 500;
    font-variant: small-caps;
    margin: 25px 0;
  }

  &__links {
    display: flex;
    margin-bottom: 30px;
    list-style: none;

    &__item {
      margin: 0 10px;

      & > a {
        display: block;
        width: 30px;
        height: 30px;

        &:hover svg path,
        &:focus svg path {
          fill: #FEDA6A;
        }

        & svg {
          width: 30px;
          height: 30px;

          & path {
            transition: fill 0.25s ease;
          }
        }
      }
    }
  }
}

//* Mobile breakpoints
@media screen and (max-width: 374.98px) {
  .footer {
    &__links__item {
      margin: 0 5px;

      & > a {
        width: 25px;
        height: 25px;
      }

      & svg {
        width: 25px;
        height: 25px;
      }
    }
  }
}
</style>
