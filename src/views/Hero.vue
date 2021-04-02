<template>
  <section id="hero">
    <nav class="nav">
      <span class="nav__logo">Jakub Soboczyński</span>
      <button
        class="hamburger"
        :class="this.openMenu ? 'hamburger--active' : null"
        aria-label="menu"
        @click.prevent="toggleMenu"
      >
        <span class="hamburger__container" tabindex="-1">
          <span class="hamburger__bars"></span>
        </span>
      </button>
      <ul class="nav__links" :class="openMenu ? 'active' : null">
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
          class="hero__img"
          src="../assets/profile.webp"
          alt="profile photo"
          width="550"
          height="550"
        />
      </div>
      <h1 class="hero__title">
        Hi, I'm Jakub
        <span class="hero__subtitle">Frontend Developer</span>
      </h1>
    </div>
    <a href="#Projects" class="actionBtn">
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
@import "../global.scss";

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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  animation: slideDown 0.5s 1.5s both;

  & a {
    transition: color 0.5s ease;

    &::after {
      display: block;
      content: "";
      border-bottom: solid 1px $text-third-color;
      transform: scaleX(0);
      transition: transform 0.5s ease;
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
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    border: 0;
    background-color: transparent;
    cursor: pointer;

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
      display: flex;
      align-items: center;
      position: relative;
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
      background-color: $text-primary-color;
      transition: transform 0.25s ease-in-out, background-color 0.25s ease-in-out;

      &:before,
      &:after {
        display: block;
        position: absolute;
        width: 30px;
        height: 2px;
        background-color: $text-primary-color;
        content: "";
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
        transform: rotate(225deg);
        transition: transform 220ms 120ms ease-in-out;
        &:before {
          top: 0;
          transition: top 100ms ease-out;
        }
        &:after {
          bottom: 0;
          transform: rotate(-90deg);
          transition: bottom 100ms ease-out, transform 220ms 120ms ease-in-out;
        }
      }
    }
  }
}

.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 100px 0;

  &__img {
    position: relative;
    border-radius: 50%;
    margin-right: 25px;
    width: 300px;
    height: 300px;
    max-width: 300px;
    max-height: 300px;
    border: 3px solid $text-primary-color;
    filter: grayscale(60%);
    z-index: 1;
    transition: filter 1s ease;
    animation: heightImg 0.5s both;

    &:hover,
    &:focus {
      filter: grayscale(0%);
      border-color: $text-third-color;
    }

    &--container {
      display: block;
      text-align: center;

      &:before {
        border-top: 2px solid $text-primary-color;
        display: block;
        content: " ";
        position: absolute;
        z-index: 0;
        top: 50%;
        left: 0;
        width: 100vw;
        animation: opacity 1.5s 0.5s both;
      }
    }
  }

  &__title {
    font-size: 3.5rem;
    font-weight: 400;
    text-align: center;
    position: relative;
    margin-bottom: 20px;
    margin-left: 40px;
    animation: slideUp 0.5s 1s both;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    text-transform: uppercase;
    margin-bottom: 5px;
    transition: color 0.5s ease;
  }

  &__arrows {
    border: solid $text-primary-color;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 10px;
    transform: rotate(45deg);
    position: relative;
    margin-bottom: 10px;
    transition: border 0.5s ease;

    &::before {
      content: "";
      position: absolute;
      @extend .actionBtn__arrows;
      transform: rotate(0deg);
      top: -6px;
      left: -6px;
    }
  }
}

//* Mobile breakpoints

@media screen and (max-width: 767.98px) {
  .nav {
    padding: 20px;
    display: block;
    position: relative;
    z-index: 2;

    &__links {
      position: absolute;
      z-index: 2 !important;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background-color: $background-secondary-color;
      height: 100vh;
      width: 0;
      visibility: hidden;
      transition: width 0.5s ease, visibility 0.5s ease;

      &.active {
        width: 100vw;
        visibility: visible;
      }
    }

    &__item {
      margin: 8px 0;
    }

    .hamburger {
      display: flex;
      position: absolute;
      z-index: 3;
      top: 18px;
      right: 20px;
    }
  }

  .hero {
    flex-direction: column-reverse;
    justify-content: space-between;
    padding: 80px 0;

    &__title {
      font-size: 2.8rem;
      margin-left: 0;
      margin-bottom: 40px;
      animation: slideLeft 0.5s 0.5s both;
    }

    &__subtitle {
      font-size: 1.9rem;
      animation: slideRight 0.5s 1s both;
    }

    &__img {
      margin-right: 0;
      width: 80%;
      height: auto;

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
