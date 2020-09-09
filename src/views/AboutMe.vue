<template>
    <section id="AboutMe">
        <h1 class="section--title">About Me</h1>
        <h3>
            Hi! My name is Jakub Soboczyński.
            <span>All informations about me in few notes below!</span>
        </h3>
        <div class="wrapper">
            <Note v-for="note in notes" :key="note.title" :note="note" />
        </div>
    </section>
</template>

<script>
import Note from "../components/Note";
export default {
    name: "AboutMe",
    data() {
        return {
            notes: [
                {
                    title: "general",
                    description:
                        "I'm a final year student of WSB University in Poznan in the faculty of informatics. I currently live in Plewiska near Poznań and I focus all my attention on developing my skills and learning about new technologies that will make my projects even better.",
                },
                {
                    title: "experience",
                    description:
                        "I have no commercial experience, but I still improve my programming skills by writing new web applications. My main goal is to find a job as a frontend developer that will help me gain experience needed in everyday work faster.",
                },
                {
                    title: "interests",
                    description:
                        "I love electronic music festivals, especially techno, trance and house sub genres. I also like to read news about android-based mobile devices and all new IT articles collected in the news aggregator - Inoreader. Since I bought my second car, I'm also interested in cars.",
                },
            ],
        };
    },
    components: {
        Note,
    },
};
</script>

<style lang="scss" scoped>
@import "../global.scss";

#AboutMe {
    background-color: $background-secondary-color;
}

h3 {
    text-align: center;
    padding: 10px;
    text-align: center;
    font-weight: 300;
    font-size: 30px;
    margin-bottom: 20px;
    font-variant: small-caps;

    & span {
        display: block;
        font-size: 22px;
    }
}

@media screen and (max-width: 768px) {
}

@media screen and (max-width: 420px) {
}

@media screen and (max-width: 375px) {
}

@media screen and (max-width: 320px) {
}
</style>