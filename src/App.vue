<template>
  <div id="app">
    <Hero />
    <AboutMe />
    <Technologies />
    <Projects />
    <Footer />
  </div>
</template>

<script>
import Hero from './views/Hero.vue';
import AboutMe from './views/AboutMe.vue';
import Technologies from './views/Technologies.vue';
import Projects from './views/Projects.vue';
import Footer from './views/Footer.vue';

export default {
  name: 'App',
  components: {
    Hero,
    AboutMe,
    Technologies,
    Projects,
    Footer,
  },
  created() {
    history.pushState('', document.title, window.location.pathname);
  },
};
</script>

<style lang="scss">
@import './global.scss';

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
}

#app {
  font-family: 'Raleway', sans-serif;
  color: $text-primary-color;
  background-color: $background-primary-color;
}

a {
  text-decoration: none;
  color: $text-primary-color;
}

.sr-only {
  position: absolute;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

.wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

.section--title {
  font-size: 2.8rem;
  font-weight: 100;
  overflow: hidden;
  padding: 50px 0 20px;
  text-align: center;
  text-transform: uppercase;

  &::before,
  &::after {
    position: relative;
    display: inline-block;
    width: 50%;
    height: 1px;
    content: '';
    vertical-align: middle;
    background-color: $text-primary-color;
  }

  &:before {
    right: 25px;
    margin-left: -50%;
  }

  &:after {
    left: 25px;
    margin-right: -50%;
  }
}

.divider {
  display: inline-block;
  width: 30px;
  height: 1px;
  margin: 10px 0 15px;
  background-color: rgba($color: $text-primary-color, $alpha: 0.4);
}

//* Mobile breakpoints

@media screen and (max-width: 991.98px) {
  .wrapper {
    max-width: 893px;
  }
  .section--title {
    font-size: 2.6rem;
  }
}

@media screen and (max-width: 767.98px) {
  .wrapper {
    max-width: 692px;
  }
  .section--title {
    font-size: 2.4rem;
  }
}

@media screen and (max-width: 575.98px) {
  .wrapper {
    max-width: 519px;
  }
  .section--title {
    font-size: 2.2rem;
  }
}

@media screen and (max-width: 419.98px) {
  .wrapper {
    max-width: 378px;
  }
  .section--title {
    font-size: 2rem;
  }
}

@media screen and (max-width: 374.98px) {
  .wrapper {
    max-width: 338px;
  }
  .section--title {
    font-size: 1.8rem;
  }
}
</style>
