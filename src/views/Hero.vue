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

@keyframes slideRight {
    0% {
        opacity: 0;
        transform: translateX(100px);
    }
    55% {
        opacity: 0;
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideLeft {
    0% {
        opacity: 0;
        transform: translateX(-100px);
    }
    55% {
        opacity: 0;
    }
    100% {
        opacity: 1;
        transform: translateX(0);
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
        transform: scale(0);
    }
    100% {
        transform: scale(1);
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
    animation: slideDown 0.5s 1.5s both;

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
        transition: filter 1s ease;
        position: relative;
        z-index: 1;
        animation: heightImg 0.5s both;

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
        animation: slideDown 0.5s 1s both;
    }
}

.image__container {
    display: block;
    text-align: center;
    position: relative;

    &:before,
    &:after {
        border-top: 2px solid $text-primary-color;
        display: block;
        height: 1px;
        content: " ";
        position: absolute;
        z-index: 0;
        top: 50%;
        animation: opacity 1.5s 0.5s both;
    }
    &:after {
        width: 75vw;
        left: 150px;
    }
    &:before {
        width: 50vw;
        right: 160px;
    }
}

.actionBtn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: max-content;
    margin: 0 auto;
    animation: slideUp 0.5s 1.5s both;

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

// Mobile breakpoints

@media screen and (max-width: 500px) {
    #hero {
        height: 90vh;
    }

    .nav {
        padding: 20px;

        &__logo {
            font-size: 24px;
        }

        &__links {
            display: none;
        }
    }
    .hero {
        flex-direction: column-reverse;
        justify-content: space-between;

        &__header {
            margin-bottom: 5vh;
            margin-left: 0;
        }

        &__title {
            animation: slideLeft 0.5s 0.5s both;
            font-size: 52px;
        }

        &__subtitle {
            animation: slideRight 0.5s 0.5s both;
            font-size: 26px;
        }

        &__img {
            margin-right: 0;
            width: 60%;
            height: auto;
        }
    }

    .image__container {
        &:before,
        &:after {
            display: none;
        }
    }

    .actionBtn {
        margin-bottom: 10px;

        &__title {
            font-size: 18px;
        }

        &__arrows {
            padding: 8px;

            &::before {
                top: -6px;
                left: -6px;
            }
        }
    }
}

@media screen and (max-width: 420px) {
    .nav {
        &__logo {
            font-size: 20px;
        }
    }

    .hero {
        &__title {
            font-size: 42px;
        }

        &__subtitle {
            font-size: 21px;
        }
    }
}

@media screen and (max-width: 375px) {
    .nav {
        &__logo {
            font-size: 16px;
        }
    }

    .hero {
        &__title {
            font-size: 34px;
        }

        &__subtitle {
            font-size: 17px;
        }
    }

    .actionBtn {
        &__title {
            font-size: 16px;
        }

        &__arrows {
            padding: 6px;

            &::before {
                top: -5px;
                left: -5px;
            }
        }
    }
}

@media screen and (max-width: 320px) {
    .nav {
        &__logo {
            font-size: 14px;
        }
    }

    .hero {
        &__title {
            font-size: 30px;
        }

        &__subtitle {
            font-size: 15px;
        }
    }

    .actionBtn {
        &__title {
            font-size: 16px;
        }

        &__arrows {
            padding: 5px;

            &::before {
                top: -4px;
                left: -4px;
            }
        }
    }
}
</style>