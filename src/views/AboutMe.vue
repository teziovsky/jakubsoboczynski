<template>
    <section id="AboutMe">
        <h1 class="section--title">About Me</h1>
    </section>
</template>

<script>
export default {
    name: "AboutMe",
};
</script>

<style lang="scss" scoped>
@import "../global.scss";

#AboutMe {
    background-color: $background-secondary-color;
    height: 100vh;
}

@media screen and (max-width: 500px) {
}
</style>