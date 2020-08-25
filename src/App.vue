<template>
    <!-- Uzupełnij informacje o technologiach -->
    <div id="app">
        <Hero />
        <AboutMe />
        <Technologies />
        <Projects />
        <Contact />
    </div>
</template>

<script>
import Hero from "./views/Hero";
import AboutMe from "./views/AboutMe";
import Technologies from "./views/Technologies";
import Projects from "./views/Projects";
import Contact from "./views/Contact";

export default {
    name: "App",
    components: {
        Hero,
        AboutMe,
        Technologies,
        Projects,
        Contact,
    },
    created() {
        history.pushState("", document.title, window.location.pathname);
    },
};
</script>

<style lang="scss">
@import "./global.scss";

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    overflow-x: hidden;
}

a {
    text-decoration: none;
    color: $text-primary-color;
}

#app {
    background-color: $background-primary-color;
    color: $text-primary-color;
    font-family: "Raleway", sans-serif;
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
    font-size: 64px;
    font-weight: 100;
    text-transform: uppercase;
    overflow: hidden;
    text-align: center;
    padding: 50px 0 20px;

    &::before,
    &::after {
        background-color: $text-primary-color;
        content: "";
        display: inline-block;
        height: 1px;
        position: relative;
        vertical-align: middle;
        width: 50%;
    }

    &:before {
        right: 0.5em;
        margin-left: -50%;
    }

    &:after {
        left: 0.5em;
        margin-right: -50%;
    }
}

.dot {
    height: 1px;
    width: 30px;
    background-color: rgba($color: $text-primary-color, $alpha: 0.4);
    display: inline-block;
    margin: 10px 0 15px;
}

@media screen and (max-width: 500px) {
    .wrapper {
        max-width: 450px;
    }

    .section--title {
        font-size: 44px;
    }
}

@media screen and (max-width: 420px) {
    .wrapper {
        max-width: 390px;
    }

    .section--title {
        font-size: 36px;
    }
}

@media screen and (max-width: 375px) {
    .wrapper {
        max-width: 355px;
    }

    .section--title {
        font-size: 32px;
    }
}

@media screen and (max-width: 320px) {
    .wrapper {
        max-width: 300px;
    }

    .section--title {
        font-size: 28px;
    }
}
</style>
