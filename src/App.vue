<template>
  <div id="app">
    <Hero />
    <AboutMe />
    <Technologies />
    <Projects />
    <Contact />
  </div>
</template>

<script>
import Hero from './views/Hero.vue';
import AboutMe from './views/AboutMe.vue';
import Technologies from './views/Technologies.vue';
import Projects from './views/Projects.vue';
import Contact from './views/Contact.vue';

export default {
  name: 'App',
  components: {
    Hero,
    AboutMe,
    Technologies,
    Projects,
    Contact,
  },
  created() {
    // eslint-disable-next-line no-restricted-globals
    history.pushState('', document.title, window.location.pathname);
  },
};
</script>

<style lang="scss">
@import './global.scss';

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  overflow-x: hidden;
}

#app {
  background-color: $background-primary-color;
  color: $text-primary-color;
  font-family: 'Raleway', sans-serif;
}

a {
  text-decoration: none;
  color: $text-primary-color;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.section--title {
  font-size: 2.8rem;
  font-weight: 100;
  text-transform: uppercase;
  overflow: hidden;
  text-align: center;
  padding: 50px 0 20px;

  &::before,
  &::after {
    background-color: $text-primary-color;
    content: '';
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 50%;
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
  height: 1px;
  width: 30px;
  background-color: rgba($color: $text-primary-color, $alpha: 0.4);
  display: inline-block;
  margin: 10px 0 15px;
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
