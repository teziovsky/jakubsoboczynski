<template>
  <header class="header">
    <nav class="nav">
      <button class="nav__burger" @click="toggleMenu"><span></span></button>
      <div class="nav__wrapper">
        <a v-smooth-scroll class="nav__link link" href="#o_mnie" @click="handleNavClick">o mnie</a>
        <a v-smooth-scroll class="nav__link link" href="#projekty" @click="handleNavClick">projekty</a>
        <a v-smooth-scroll class="nav__link link" href="#kontakt" @click="handleNavClick">kontakt</a>
      </div>
      <g-link class="button" to="/blog/">Blog</g-link>
    </nav>
    <svg class="header__logo"
         fill="none"
         height="113"
         viewBox="0 0 93 113"
         width="93"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M46.7376 104.089V112M46.7376 112H38.0787L24.3421 91.3683L2 73.516L10.6055 56.5724M46.7376 112H55.2896L69.0262 91.3683L91.3683 73.516L82.7629 56.5724M10.6055 56.5724L8.89505 2L10.6055 2.05345L38.0787 30.0078M10.6055 56.5724L38.0787 30.0078M10.6055 56.5724L46.7376 78.1127M82.7629 56.5724L46.7376 78.1127M82.7629 56.5724L84.4733 2.00001H82.7629L55.2896 30.0078M82.7629 56.5724L55.2896 30.0078M38.0787 30.0078H46.7376M46.7376 78.1127L55.436 51.9757M46.7376 78.1127L38.0569 52.0292M46.7376 30.0078L35.5666 44.5462L38.0569 52.0292M46.7376 30.0078L57.9086 44.5462L55.436 51.9757M46.7376 30.0078H55.2896M55.436 51.9757L46.7376 40.6978L38.0569 52.0292M66.1399 66.4072H74.0505L67.5296 72.1263L54.274 73.8902L65.1778 67.1555M27.5491 66.4072H19.6385L26.1594 72.1263L39.415 73.8902L28.5112 67.1555L27.5491 66.4072Z"
            stroke="white"
            stroke-width="2" />
    </svg>
  </header>
</template>

<script>
export default {
  name: 'HeaderHome',
  methods: {
    toggleMenu() {
      document.querySelector('.nav__wrapper').classList.toggle('opened');
      document.querySelector('.nav__burger').classList.toggle('opened');
    },
    handleNavClick() {
      document.querySelector('.nav__wrapper').classList.remove('opened');
      document.querySelector('.nav__burger').classList.remove('opened');
    },
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
        transition: background 0.4s;

        &:before,
        &:after {
          content: '';
          position: absolute;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: var(--font-color);
          border-radius: 3px;
          transition: background 0.5s, transform 0.5s, top 0.5s;
        }

        &:before {
          top: -10px;
          transition: background 0.2s, transform 0.5s, top 0.5s;
        }

        &:after {
          bottom: -10px;
          transition: background 0.6s, transform 0.5s, top 0.5s;
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
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      visibility: hidden;
      font-size: 24px;
      background-color: var(--secondary-color);
      padding: 120px 20px 80px;
      transform: translateX(-100%);
      transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), visibility 0.5s cubic-bezier(0.19, 1, 0.22, 1);
      row-gap: 30px;

      &.opened {
        visibility: visible;
        transform: translateX(0);
      }
    }

    &__link {
      width: max-content;
      font-family: var(--font-family-secondary);
      padding: 5px 0;
    }
  }

  &__logo {
    position: absolute;
    top: 34px;
    left: 50%;
    width: clamp(4.375rem, 3.68902445rem + 2.926829vw, 6.25rem);
    transform: translateX(-50%);
    transform-origin: top;
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
        column-gap: 32px;
      }

      &__link {
        font-family: var(--font-family-secondary);
      }
    }
  }
}
</style>