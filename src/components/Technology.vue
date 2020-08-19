<template>
    <div class="card">
        <div data-aos="zoom-out-right" data-aos-duration="1000" class="card__image">
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
    }

    &__title {
        font-size: 24px;
        font-weight: 300;
    }

    &__description {
        text-align: justify;
    }
}
</style>