<template>
  <section id="hero">
    <nav class="nav">
      <span class="nav__logo">Jakub Soboczyński</span>
      <button
        :class="openMenu ? 'hamburger--active' : null"
        aria-label="menu"
        class="hamburger"
        @click.prevent="toggleMenu"
      >
        <span class="hamburger__container" tabindex="-1">
          <span class="hamburger__bars"></span>
        </span>
      </button>
      <ul :class="openMenu ? 'active' : null" class="nav__links">
        <li class="nav__item">
          <a href="#AboutMe" @click="handleLinkClick">AboutMe</a>
        </li>
        <li class="nav__item">
          <a href="#Technologies" @click="handleLinkClick">Technologies</a>
        </li>
        <li class="nav__item">
          <a href="#Projects" @click="handleLinkClick">Projects</a>
        </li>
        <li class="nav__item">
          <a href="#Contact" @click="handleLinkClick">Contact</a>
        </li>
      </ul>
    </nav>
    <div class="hero">
      <div class="hero__img--container">
        <img
          alt="profile photo"
          class="hero__img"
          height="550"
          src="../assets/profile.webp"
          width="550"
        />
      </div>
      <h1 class="hero__title">
        Hi, I'm Jakub
        <span class="hero__subtitle">Frontend Developer</span>
      </h1>
    </div>
    <a class="actionBtn" href="#Projects">
      <p class="actionBtn__title">View projects</p>
      <span class="actionBtn__arrows"></span>
    </a>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  data() {
    return {
      openMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      const body = document.getElementsByTagName('body')[0];
      const scrollBarWidth = window.innerWidth - document.body.clientWidth;
      this.openMenu = !this.openMenu;
      // eslint-disable-next-line no-unused-expressions
      this.openMenu
        ? (body.style.cssText = `overflow: hidden; padding-right: ${scrollBarWidth}px`)
        : body.removeAttribute('style');
    },
    handleLinkClick() {
      const body = document.getElementsByTagName('body')[0];
      if (this.openMenu) {
        body.removeAttribute('style');
        this.openMenu = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../global.scss';

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  55% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  55% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRight {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  55% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideLeft {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  55% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes heightImg {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

#hero {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  animation: slideDown 0.5s 1.5s both;

  & a {
    transition: color 0.5s ease;

    &::after {
      display: block;
      content: '';
      transition: transform 0.5s ease;
      transform: scaleX(0);
      border-bottom: solid 1px $text-third-color;
    }

    &:hover,
    &:focus {
      color: $text-third-color;

      &::after {
        transform: scaleX(1);
      }
    }
  }

  &__logo {
    font-size: 1.8rem;
    font-weight: 500;
    font-variant: small-caps;
  }

  &__links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
  }

  &__item {
    font-size: 1.3rem;
    font-weight: 300;
    margin: 0 10px;
    text-transform: uppercase;

    &:last-child {
      margin-right: 0;
    }
  }

  .hamburger {
    display: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    border: 0;
    background-color: transparent;

    &:hover,
    &:focus {
      .hamburger {
        outline: none;

        &__bars {
          background-color: $text-third-color;

          &:before,
          &:after {
            background-color: $text-third-color;
          }
        }
      }
    }

    &__container {
      position: relative;
      display: flex;
      align-items: center;
      width: 30px;
      height: 30px;

      &:focus {
        outline: none;
      }
    }

    &__bars {
      position: absolute;
      width: 30px;
      height: 2px;
      transition: transform 0.25s ease-in-out, background-color 0.25s ease-in-out;
      background-color: $text-primary-color;

      &:before,
      &:after {
        position: absolute;
        display: block;
        width: 30px;
        height: 2px;
        content: '';
        background-color: $text-primary-color;
      }

      &:before {
        top: -10px;
        transition: top 0.1s 0.25s ease-in, transform 0.25s ease-in-out,
          background-color 0.25s ease-in-out;
      }

      &:after {
        bottom: -10px;
        transition: bottom 0.1s 0.25s ease-in, transform 0.25s ease-in-out,
          background-color 0.25s ease-in-out;
      }
    }

    &--active {
      .hamburger__bars {
        transition: transform 220ms 120ms ease-in-out;
        transform: rotate(225deg);

        &:before {
          top: 0;
          transition: top 100ms ease-out;
        }

        &:after {
          bottom: 0;
          transition: bottom 100ms ease-out, transform 220ms 120ms ease-in-out;
          transform: rotate(-90deg);
        }
      }
    }
  }
}

.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0;

  &__img {
    position: relative;
    z-index: 1;
    width: 300px;
    max-width: 300px;
    height: 300px;
    max-height: 300px;
    margin-right: 25px;
    transition: filter 1s ease;
    animation: heightImg 0.5s both;
    border: 3px solid $text-primary-color;
    border-radius: 50%;
    filter: grayscale(60%);

    &:hover,
    &:focus {
      border-color: $text-third-color;
      filter: grayscale(0%);
    }

    &--container {
      display: block;
      text-align: center;

      &:before {
        position: absolute;
        z-index: 0;
        top: 50%;
        left: 0;
        display: block;
        width: 100vw;
        content: ' ';
        animation: opacity 1.5s 0.5s both;
        border-top: 2px solid $text-primary-color;
      }
    }
  }

  &__title {
    font-size: 3.5rem;
    font-weight: 400;
    position: relative;
    margin-bottom: 20px;
    margin-left: 40px;
    animation: slideUp 0.5s 1s both;
    text-align: center;
  }

  &__subtitle {
    font-size: 2rem;
    font-weight: 300;
    display: block;
    animation: slideDown 0.5s 1s both;
  }
}

.actionBtn {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: max-content;
  margin: 0 auto 20px;
  animation: slideUp 0.5s 1.5s both;

  &:hover &__title,
  &:focus &__title {
    color: $text-third-color;
  }

  &:hover &__arrows,
  &:focus &__arrows {
    border: solid $text-third-color;
    border-width: 0 2px 2px 0;
  }

  &__title {
    font-size: 1.3rem;
    font-weight: 300;
    margin-bottom: 5px;
    transition: color 0.5s ease;
    text-transform: uppercase;
  }

  &__arrows {
    position: relative;
    display: inline-block;
    margin-bottom: 10px;
    padding: 10px;
    transition: border 0.5s ease;
    transform: rotate(45deg);
    border: solid $text-primary-color;
    border-width: 0 2px 2px 0;

    &::before {
      position: absolute;
      top: -6px;
      @extend .actionBtn__arrows;
      left: -6px;
      content: '';
      transform: rotate(0deg);
    }
  }
}

//* Mobile breakpoints

@media screen and (max-width: 767.98px) {
  .nav {
    position: relative;
    z-index: 2;
    display: block;
    padding: 20px;

    &__links {
      position: absolute;
      z-index: 2 !important;
      top: 0;
      left: 0;
      display: flex;
      visibility: hidden;
      overflow: hidden;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      width: 0;
      height: 100vh;
      transition: width 0.5s ease, visibility 0.5s ease;
      background-color: $background-secondary-color;

      &.active {
        visibility: visible;
        width: 100vw;
      }
    }

    &__item {
      margin: 8px 0;
    }

    .hamburger {
      position: absolute;
      z-index: 3;
      top: 18px;
      right: 20px;
      display: flex;
    }
  }

  .hero {
    flex-direction: column-reverse;
    justify-content: space-between;
    padding: 80px 0;

    &__title {
      font-size: 2.8rem;
      margin-bottom: 40px;
      margin-left: 0;
      animation: slideLeft 0.5s 0.5s both;
    }

    &__subtitle {
      font-size: 1.9rem;
      animation: slideRight 0.5s 1s both;
    }

    &__img {
      width: 80%;
      height: auto;
      margin-right: 0;

      &--container {
        &:before,
        &:after {
          display: none;
        }
      }
    }
  }

  .actionBtn {
    &__arrows {
      padding: 8px;

      &::before {
        top: -6px;
        left: -6px;
      }
    }
  }
}

@media screen and (max-width: 575.98px) {
  .nav {
    &__logo {
      font-size: 1.4rem;
    }
  }

  .hero {
    padding: 80px 0;

    &__title {
      font-size: 2.6rem;
    }

    &__subtitle {
      font-size: 1.7rem;
    }
  }
}

@media screen and (max-width: 419.98px) {
  .hero {
    &__title {
      margin-bottom: 30px;
    }
  }
}

@media screen and (max-width: 374.98px) {
  .actionBtn {
    &__arrows {
      padding: 6px;

      &::before {
        top: -5px;
        left: -5px;
      }
    }
  }
}
</style>
