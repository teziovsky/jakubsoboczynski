<template>
    <div class="card">
        <div class="card__info">
            <h2 class="card__title">{{project.title}}</h2>
            <span class="dot"></span>
            <p class="card__description">{{project.description}}</p>
        </div>
        <div class="card__links">
            <button class="card__links__item" @click.prevent="toggleScreen">SCREEN</button>
            <a class="card__links__item" :href="project.github_link">SOURCE</a>
            <a class="card__links__item" :href="project.demo_link">DEMO</a>
        </div>
    </div>
</template>

<script>
export default {
    props: ["project"],
    name: "Project",
    methods: {
        toggleScreen() {
            console.log("toggled");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../global.scss";

button {
    color: $text-primary-color;
    border: 0;
    font: inherit;

    &:focus {
        outline: none;
    }

    &:hover {
        cursor: pointer;
    }
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    background-color: $background-third-color;
    width: 350px;
    margin: 25px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);

    &__info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 30px 20px;
    }

    &__title {
        font-size: 24px;
        font-weight: 300;
    }

    &__description {
        text-align: justify;
    }

    &__links {
        display: flex;
        justify-content: space-around;
        border-top: 1px solid rgba($color: $text-primary-color, $alpha: 0.2);

        &__item {
            font-size: 14px;
            font-weight: 300;
            padding: 5px 13px;
            margin: 20px 17px;
            background: none;
            transition: color 0.25s, border 0.25s ease;
            position: relative;

            &:hover {
                color: $text-third-color;
            }

            &::before,
            &::after {
                display: block;
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 0;
                border: 1px solid transparent;
            }

            &:hover::before,
            &:hover::after {
                width: 100%;
                height: 100%;
            }

            &:hover::before {
                border-top-color: $text-third-color;
                border-right-color: $text-third-color;
                transition: height 0.25s ease-out 0.25s, width 0.25s ease-out;
            }

            &:hover::after {
                border-bottom-color: $text-third-color;
                border-left-color: $text-third-color;
                transition: height 0.25s ease-out, width 0.25s ease-out 0.25s;
            }
        }
    }
}
</style>