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
            <img class="hero__img" src="../assets/profile.png" alt="profile photo" />
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

#hero {
    background-color: #1d1e22;
    padding-bottom: 30px;
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
    padding: 0px 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    &__header {
        margin-top: -30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    &__img {
        border-radius: 50%;
        width: 300px;
        height: 300px;
        border: 3px solid $text-primary-color;
        filter: grayscale(75%);
    }

    &__title {
        font-size: 64px;
        font-weight: 400;
        position: relative;
    }

    &__subtitle {
        font-size: 36px;
        font-weight: 300;
    }
}

.actionBtn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    margin: 0 auto 20px;

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