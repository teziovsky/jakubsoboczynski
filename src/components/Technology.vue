<template>
    <div class="card">
        <div
            data-aos="zoom-out-right"
            data-aos-duration="1000"
            data-aos-anchor-placement="center-bottom"
            class="card__image"
        >
            <img :src="require('../assets/technologies/' + technology.image + '.png')" alt="html" />
        </div>
        <div data-aos="zoom-in" class="card__info">
            <h2 class="card__title">{{technology.name}}</h2>
            <span class="dot"></span>
            <p class="card__description">{{technology.subtitle}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ["technology"],
    name: "Technology",
};
</script>

<style lang="scss" scoped>
@import "../global.scss";

.card {
    display: flex;
    position: relative;
    width: 550px;
    margin: 20px 25px 20px 0;

    &__image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 130px;
        height: 130px;
        background-color: $background-secondary-color;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
        position: absolute;
        top: 50%;
        left: 25px;
        z-index: 1;

        &.aos-animate {
            transform: translateY(-50%) !important;
        }

        & > img {
            max-width: 110px;
            height: 110px;
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: $background-third-color;
        min-height: 150px;
        min-width: 410px;
        margin-left: 140px;
        padding: 20px 20px 20px 25px;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
        font-size: 16px;
    }

    &__title {
        font-size: 1.5em;
        font-weight: 500;
        font-variant: small-caps;
    }

    &__description {
        font-size: 1em;
        font-weight: 300;
        text-align: justify;
    }
}

// Mobile breakpoints

@media screen and (max-width: 768px) {
    .card {
        width: 100%;

        &__image {
            height: 100px;
            width: 100px;

            & > img {
                max-width: 80px;
                height: 80px;
            }
        }

        &__info {
            min-width: 200px;
            margin-left: 110px;
        }
    }
}

@media screen and (max-width: 420px) {
    .card {
        width: 100%;

        &__image {
            height: 90px;
            width: 90px;

            & > img {
                max-width: 70px;
                height: 70px;
            }
        }

        &__info {
            min-width: 200px;
            margin-left: 100px;
            font-size: 14px;
        }
    }
}

@media screen and (max-width: 375px) {
    .card {
        width: 100%;

        &__image {
            height: 80px;
            width: 80px;

            & > img {
                max-width: 60px;
                height: 60px;
            }
        }

        &__info {
            min-width: 200px;
            margin-left: 90px;
            font-size: 12px;
        }
    }
}

@media screen and (max-width: 320px) {
    .card {
        width: 100%;

        &__image {
            height: 70px;
            width: 70px;

            & > img {
                max-width: 50px;
                height: 50px;
            }
        }

        &__info {
            min-width: 200px;
            margin-left: 80px;
            font-size: 12px;
        }
    }
}
</style>