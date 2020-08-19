<template>
    <section id="hero">
        <nav class="nav">
            <span class="nav__logo">Jakub Soboczyński</span>
            <ul class="nav__links">
                <li class="nav__item">
                    <a href="#AboutMe">AboutMe</a>
                </li>
                <li class="nav__item">
                    <a href="#Technologies">Technologies</a>
                </li>
                <li class="nav__item">
                    <a href="#Projects">Projects</a>
                </li>
                <li class="nav__item">
                    <a href="#Contact">Contact</a>
                </li>
            </ul>
        </nav>
        <div class="hero">
            <div class="image__container">
                <img class="hero__img" src="../assets/profile.png" alt="profile photo" />
            </div>
            <div class="hero__header">
                <h1 class="hero__title">Hi, I'm Jakub</h1>
                <h2 class="hero__subtitle">Frontend Developer</h2>
            </div>
        </div>
        <a href="#Projects" class="actionBtn">
            <p class="actionBtn__title">View projects</p>
            <span class="actionBtn__arrows"></span>
        </a>
    </section>
</template>

<script>
export default {
    name: "Hero",
};
</script>

<style lang="scss" scoped>
@import "../global.scss";

@keyframes slideUp {
    0% {
        opacity: 0;
        transform: translateY(100px);
    }
    55% {
        opacity: 0;
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideDown {
    0% {
        opacity: 0;
        transform: translateY(-100px);
    }
    55% {
        opacity: 0;
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes opacity {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes heightImg {
    0% {
        height: 0;
        width: 0;
    }
    100% {
        height: 300px;
        width: 300px;
    }
}

#hero {
    padding-bottom: 10px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;

    & a {
        transition: color 0.5s ease;

        &::after {
            display: block;
            content: "";
            border-bottom: solid 1px $text-third-color;
            transform: scaleX(0);
            transition: transform 0.5s ease;
        }

        &:hover {
            color: $text-third-color;

            &::after {
                transform: scaleX(1);
            }
        }
    }

    &__logo {
        font-size: 36px;
        font-weight: 500;
    }

    &__links {
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__item {
        font-size: 24px;
        font-weight: 300;
        order: 1;
        margin: 0 15px;
        text-transform: uppercase;

        &:last-child {
            margin-right: 0;
        }
    }
}

.hero {
    display: flex;
    justify-content: center;
    align-items: center;

    &__header {
        margin-top: -30px;
        margin-left: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-shadow: 0px 5px 10px #000000;
    }

    &__img {
        border-radius: 50%;
        margin-right: 25px;
        width: 300px;
        height: 300px;
        border: 3px solid $text-primary-color;
        filter: grayscale(80%);
        animation: heightImg 0.5s both;
        transition: filter 1s ease;

        &:hover {
            filter: grayscale(0%);
            border-color: $text-third-color;
        }
    }

    &__title {
        font-size: 64px;
        font-weight: 400;
        position: relative;
        animation: slideUp 0.5s 1s both;
    }

    &__subtitle {
        font-size: 36px;
        font-weight: 300;
        animation: slideDown 0.75s 1.5s both;
    }
}

.image__container {
    display: block;
    text-align: center;
    position: relative;

    &:before {
        content: "";
        width: 200vw;
        position: absolute;
        left: -75vw;
        top: 50%;
        height: 2px;
        background: $text-primary-color;
        z-index: 0;
        animation: opacity 1.5s 0.5s both;
    }
}

.actionBtn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    margin: 0 auto;

    &:hover &__title {
        color: $text-third-color;
    }

    &:hover &__arrows {
        border: solid $text-third-color;
        border-width: 0 2px 2px 0;
    }

    &__title {
        font-size: 24px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 5px;
        transition: color 0.5s ease;
    }

    &__arrows {
        border: solid $text-primary-color;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 15px;
        transform: rotate(45deg);
        position: relative;
        margin-bottom: 10px;
        transition: border 0.5s ease;

        &::before {
            content: "";
            position: absolute;
            @extend .actionBtn__arrows;
            transform: rotate(0deg);
            top: -12px;
            left: -12px;
        }
    }
}
</style>