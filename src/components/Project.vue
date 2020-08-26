<template>
    <div class="card">
        <div
            data-aos="zoom-out-left"
            data-aos-delay="300"
            data-aos-anchor-placement="center-bottom"
            class="card__links"
        >
            <button class="card__links__item" @click.prevent="toggleScreen">SCREEN</button>
            <a class="card__links__item" :href="project.github_link">SOURCE</a>
            <a class="card__links__item" :href="project.demo_link">DEMO</a>
        </div>
        <div data-aos="flip-up" class="card__info">
            <h2 class="card__title">{{project.title}}</h2>
            <span class="dot"></span>
            <p class="card__description">{{project.description}}</p>
        </div>
        <!-- <img
                    class="card__screen"
                    :src="require('../assets/projects/' + project.image + '.png')"
                    alt="#"
        />-->
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
    justify-content: space-between;
    position: relative;
    width: 500px;
    margin: 25px;
    font-size: 12px;

    &__links {
        position: absolute;
        top: 50%;
        left: -25px;
        background-color: $background-secondary-color;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: space-around;
        z-index: 0;

        &.aos-animate {
            transform: translateY(-50%) !important;
        }

        &__item {
            font-size: 1em;
            font-weight: 300;
            padding: 6px 9px;
            margin: 10px 25px 10px 10px;
            background: none;
            transition: color 0.25s, border 0.25s ease;
            z-index: 2;
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

    &__info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
        background-color: $background-third-color;
        margin-left: 60px;
        padding: 30px 20px;
    }

    &__screen {
        width: 350px;
        height: auto;
    }

    &__title {
        font-size: 2.1em;
        font-weight: 500;
        font-variant: small-caps;
    }

    &__description {
        text-align: justify;
        font-size: 1.1em;
    }
}

// Mobile breakpoints

@media screen and (max-width: 768px) {
    .card {
        width: 100%;
        margin-left: 45px;
    }
}

@media screen and (max-width: 420px) {
    .card {
        width: 100%;
        margin-left: 45px;
    }
}

@media screen and (max-width: 375px) {
    .card {
        width: 100%;
        margin-left: 45px;
        font-size: 10px;

        &__info {
            margin-left: 45px;
        }

        &__links__item {
            padding: 6px 9px;
            margin: 5px 12px 5px 5px;
        }
    }
}

@media screen and (max-width: 320px) {
    .card {
        width: 100%;
        margin-left: 45px;
        font-size: 10px;

        &__info {
            margin-left: 45px;
        }

        &__links__item {
            padding: 6px 9px;
            margin: 5px 12px 5px 5px;
        }
    }
}
</style>