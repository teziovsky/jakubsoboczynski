<template>
    <section id="Technologies">
        <h1 class="section--title">Technologies</h1>
        <div class="wrapper">
            <Technology
                v-for="(technology, index) in technologies"
                :key="index"
                :technology="technology"
            />
        </div>
    </section>
</template>

<script>
import Technology from "../components/Technology";
export default {
    name: "Technologies",
    data() {
        return {
            technologies: [
                {
                    name: "HTML5",
                    subtitle:
                        "Knowledge of HTML document structure. Ability to use semantic tags.",
                    image: "html",
                },
                {
                    name: "CSS3",
                    subtitle:
                        "Knowledge of CSS. Using BEM methodology and SASS preprocessors in projects. Creating responsive websites using grid, flex and media queries.",
                    image: "css",
                },
                {
                    name: "JavaScript",
                    subtitle:
                        "Creating basic and medium JavaScript scripts also with using jQuery. Knowledge of spread operator, arrow functions and other ES6 functions. Knowledge of Vue.js and basic knowledge of React.js.",
                    image: "js",
                },
                {
                    name: "Vue.js",
                    subtitle:
                        "Ability to writing  apps in Vue.js using Vue-Cli, Vuetify, Vuex Store, Vue-Router, Vue-Axios, Vuelidate. Knowledge about transitions and animations.",
                    image: "vue",
                },
                {
                    name: "Bootstrap",
                    subtitle:
                        "Practical use of Bootstrap components in projects. Ability to personalize components for the needs of the project.",
                    image: "bootstrap",
                },
                {
                    name: "GIT",
                    subtitle:
                        "Ability to use the local and remote version-control system like GIT  and GitHub. Knowledge of git commands.",
                    image: "git",
                },
                {
                    name: "Gulp",
                    subtitle:
                        "Ability to configure Gulp to improve the speed of coding and for prepare production files.",
                    image: "gulp",
                },
                {
                    name: "Photoshop",
                    subtitle:
                        "Basic photo editing. Creating buttons, banners, icons for websites.",
                    image: "photoshop",
                },
                {
                    name: "Figma",
                    subtitle: "Ability to create simple website layouts.",
                    image: "figma",
                },
                {
                    name: "Adobe XD",
                    subtitle: "Ability to create simple website layouts.",
                    image: "xd",
                },
            ],
        };
    },
    components: {
        Technology,
    },
};
</script>

<style lang="scss" scoped>
@import "../global.scss";

#Technologies {
    padding-bottom: 50px;
}
</style>