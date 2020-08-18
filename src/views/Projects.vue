<template>
    <section id="Projects">
        <h1 class="section--title">Projects</h1>
        <div class="wrapper">
            <Project v-for="(project,index) in projects" :key="index" :project="project" />
        </div>
    </section>
</template>

<script>
import Project from "../components/Project";

export default {
    name: "Projects",
    data() {
        return {
            projects: [
                {
                    image: "jakubsoboczynski",
                    title: "Portfolio | Jakub Soboczyński",
                    description:
                        "The front-end developer portfolio writed in Vue.js. In this project i used Vuetify, vuelidate and vue-axios.",
                    github_link:
                        "https://github.com/teziovsky/Portfolio_Teziovsky",
                    demo_link:
                        "https://teziovsky.github.io/Portfolio_Teziovsky/",
                },
                {
                    image: "servicebook",
                    title: "Car service book",
                    description:
                        "The car service book website writed in Vue.js. Using vuetify, vuex store, vuelidate, vue-router and vue-axios to connect with MySQL database.",
                    github_link: "https://github.com/teziovsky/Service-Book_v3",
                    demo_link: "http://servicebook.ct8.pl/",
                },
                {
                    image: "servicebook",
                    title: "Image search engine",
                    description:
                        "The image search engine writed in Vue.js. Using axios to get data from Flickr API and SCSS to add styles to this project.",
                    github_link: "https://github.com/teziovsky/Images-gallery",
                    demo_link: "https://teziovsky.github.io/Images-gallery/",
                },
            ],
        };
    },
    components: {
        Project,
    },
};
</script>

<style lang="scss" scoped>
@import "../global.scss";

#Projects {
    background-color: $background-secondary-color;
    padding-bottom: 50px;
}
</style>