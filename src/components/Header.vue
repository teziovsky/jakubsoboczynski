<template>
  <header class="header">
    <nav class="nav">
      <button v-if="$route.name === 'home'"
              aria-label="Pokaż/Ukryj nawigację"
              class="nav__burger"
              @click="toggleMenu"><span></span></button>
      <div v-if="$route.name === 'home'" class="nav__wrapper">
        <a v-smooth-scroll
           aria-label="Przejdź do sekcji o mnie"
           class="nav__link link"
           href="#o_mnie"
           @click="hideMenu">
          o mnie
        </a>
        <a v-smooth-scroll
           aria-label="Przejdź do sekcji projekty"
           class="nav__link link"
           href="#projekty"
           @click="hideMenu">
          projekty
        </a>
        <a v-smooth-scroll
           aria-label="Przejdź do sekcji kontakt"
           class="nav__link link"
           href="#kontakt"
           @click="hideMenu">
          kontakt
        </a>
      </div>
      <a :aria-label="$route.name === 'home' ? 'Przejdź do podstrony zawierającej blog' : 'Przejdź do portfolio'"
         :href="$route.name === 'home' ? '/blog/' : '/'"
         class="button">
        {{ $route.name === 'home' ? 'Blog' : 'Portfolio' }}
      </a>
    </nav>
    <svg class="header__logo"
         fill="none"
         height="113"
         viewBox="0 0 93 113"
         width="93"
         xmlns="http://www.w3.org/2000/svg">
      <title>Logo serwisu jakubsoboczynski.pl</title>
      <path d="M46.7376 104.089V112M46.7376 112H38.0787L24.3421 91.3683L2 73.516L10.6055 56.5724M46.7376 112H55.2896L69.0262 91.3683L91.3683 73.516L82.7629 56.5724M10.6055 56.5724L8.89505 2L10.6055 2.05345L38.0787 30.0078M10.6055 56.5724L38.0787 30.0078M10.6055 56.5724L46.7376 78.1127M82.7629 56.5724L46.7376 78.1127M82.7629 56.5724L84.4733 2.00001H82.7629L55.2896 30.0078M82.7629 56.5724L55.2896 30.0078M38.0787 30.0078H46.7376M46.7376 78.1127L55.436 51.9757M46.7376 78.1127L38.0569 52.0292M46.7376 30.0078L35.5666 44.5462L38.0569 52.0292M46.7376 30.0078L57.9086 44.5462L55.436 51.9757M46.7376 30.0078H55.2896M55.436 51.9757L46.7376 40.6978L38.0569 52.0292M66.1399 66.4072H74.0505L67.5296 72.1263L54.274 73.8902L65.1778 67.1555M27.5491 66.4072H19.6385L26.1594 72.1263L39.415 73.8902L28.5112 67.1555L27.5491 66.4072Z"
            stroke="white"
            stroke-width="2" />
    </svg>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    detectMobile() {
      const width = (window.innerWidth > 0) ? window.innerWidth : document.documentElement.clientWidth;
      const nav = document.querySelector('.nav__wrapper');
      if (width > 768) {
        if (nav) nav.classList.remove('mobile');
        this.hideMenu();
      } else {
        if (nav) nav.classList.add('mobile');
      }
    },
    toggleMenu() {
      const wrapper = document.querySelector('.nav__wrapper');
      if (wrapper) wrapper.classList.toggle('opened');
      const burger = document.querySelector('.nav__burger');
      if (burger) burger.classList.toggle('opened');
      const body = document.querySelector('body');
      if (body) body.classList.toggle('opened');
    },
    hideMenu() {
      const wrapper = document.querySelector('.nav__wrapper');
      if (wrapper) wrapper.classList.remove('opened');
      const burger = document.querySelector('.nav__burger');
      if (burger) burger.classList.remove('opened');
      const body = document.querySelector('body');
      if (body) body.removeAttribute('class');
    },
  },
  mounted() {
    this.detectMobile();
    window.addEventListener('resize', this.detectMobile);
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 20px;

    &__burger {
      position: relative;
      z-index: 5;
      width: 48px;
      height: 38px;
      font-family: inherit;

      @include hover {
        span,
        span:before,
        span:after {
          background-color: var(--third-color);
        }
      }

      span {
        position: relative;
        width: 100%;
        height: 3px;
        display: block;
        text-align: center;
        background-color: var(--font-color);
        border-radius: 3px;
        margin: 0 auto;
        transition: background 2s var(--transition-timing-function);

        &:before,
        &:after {
          content: '';
          position: absolute;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: var(--font-color);
          border-radius: 3px;
        }

        &:before {
          top: -10px;
          transition-timing-function: var(--transition-timing-function);
          transition-duration: 2s;
          transition-property: background, top, box-shadow, transform;
        }

        &:after {
          bottom: -10px;
          transition-timing-function: var(--transition-timing-function);
          transition-duration: 2s;
          transition-property: background, bottom, box-shadow, transform;
        }
      }

      &.opened {
        span {
          background: rgba(var(--font-color-rgb), 0);

          &:before {
            top: 0;
            box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
            transform: rotate(135deg);
          }

          &:after {
            top: 0;
            box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
            transform: rotate(225deg);
          }
        }
      }
    }

    &__wrapper {
      position: fixed;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      visibility: hidden;
      font-size: 24px;
      background-color: var(--secondary-color);
      padding: 120px 20px 80px;
      transform: translateX(-100%);
      row-gap: 30px;

      &.opened {
        visibility: visible;
        transform: translateX(0);
      }

      &.mobile {
        transition-timing-function: var(--transition-timing-function);
        transition-duration: 0.75s;
        transition-property: transform, visibility, background;
      }
    }

    &__link {
      width: max-content;
      font-family: var(--font-family-secondary);
      padding: 10px 15px;

      &:after {
        bottom: 5px;
        width: calc(80% - 30px);
      }
    }
  }

  &__logo {
    position: absolute;
    top: clamp(0.9375rem, 0.50304867rem + 1.853659vw, 2.125rem);
    left: 50%;
    width: clamp(4.375rem, 3.68902445rem + 2.926829vw, 6.25rem);
    transform: translateX(-50%);
    transform-origin: top;

    path {
      transition: stroke var(--transition-duration) var(--transition-timing-function);
      stroke: var(--font-color);
    }
  }
}

@media screen and (min-width: 768px) {
  .header {
    .nav {
      padding: 40px 50px;

      &__burger {
        display: none;
      }

      &__wrapper {
        position: static;
        width: unset;
        height: unset;
        flex-direction: row;
        visibility: visible;
        font-size: 16px;
        background: none;
        padding: 0;
        transform: translateX(0);
        row-gap: unset;
        column-gap: 15px;
      }

      &__link {
        font-family: var(--font-family-secondary);
      }
    }
  }
}
</style>