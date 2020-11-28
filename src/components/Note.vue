<template>
    <div data-aos="zoom-out-up" class="note">
        <p class="note__title">{{note.title}}</p>
        <p data-aos="zoom-in" data-aos-delay="400" class="note__description">{{note.description}}</p>
    </div>
</template>

<script>
export default {
    props: ["note"],
    name: "Note",
};
</script>

<style lang="scss">
@import "../global.scss";

.note {
    width: 350px;
    min-height: 150px;
    padding: 25px 20px 20px 20px;
    margin: 20px 10px 44px 10px;
    position: relative;
    color: $text-primary-color;
    background: $background-third-color;
    line-height: 1.3em;
    font-size: 16px;
    text-align: center;
    box-shadow: 0 4px 5px rgba($background-primary-color, 0.4);

    &:before {
        display: block;
        content: "";
        line-height: 30px;
        font-size: 16px;
        background: rgba($text-third-color, 0.5);
        width: 130px;
        height: 28px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        border-radius: 6px/18px 0;
        position: absolute;
        top: -13px;
        left: 50%;
        transform: rotate(-2deg);
        transform: translateX(-50%);
    }

    &__title {
        position: absolute;
        top: -13px;
        left: 50%;
        transform: translateX(-50%);
        color: rgba($color: $background-third-color, $alpha: 0.8);
        text-transform: lowercase;
        font-weight: 500;
        line-height: 30px;
    }

    &__description {
        text-align: justify;
    }
}

@media screen and (max-width: 768px) {
    .note {
        font-size: 16px;
    }
}

@media screen and (max-width: 420px) {
    .note {
        font-size: 16px;
    }
}

@media screen and (max-width: 375px) {
    .note {
        font-size: 14px;
    }
}

@media screen and (max-width: 320px) {
    .note {
        min-height: 120px;
        font-size: 12px;
    }
}
</style>