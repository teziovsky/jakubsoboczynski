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
                    image: "servicebook",
                    title: "Movies search engine",
                    description:
                        "The movie search engine with The Movie DB API. Created for the needs of recruitment to Junior Frontend Developer.",
                    github_link:
                        "https://github.com/teziovsky/movie-search-engine#readme",
                    demo_link:
                        "https://teziovsky.github.io/movie-search-engine/",
                },
                {
                    image: "servicebook",
                    title: "Image search engine",
                    description:
                        "The image search engine writed in Vue.js. Using axios to get data from Flickr API and SCSS to add styles to this project.",
                    github_link:
                        "https://github.com/teziovsky/Images-gallery#readme",
                    demo_link: "https://teziovsky.github.io/Images-gallery/",
                },
                {
                    image: "servicebook",
                    title: "Car service book",
                    description:
                        "The car service book website writed in Vue.js. Using vuetify, vuex store, vuelidate, vue-router and vue-axios to connect with MySQL database.",
                    github_link:
                        "https://github.com/teziovsky/Service-Book_v3#readme",
                    demo_link: "http://servicebook.ct8.pl/",
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