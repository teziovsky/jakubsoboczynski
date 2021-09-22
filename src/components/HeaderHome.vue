<template>
  <header class="header">
    <nav class="nav">
      <div class="nav__wrapper">
        <a class="nav__link link" href="#o_mnie">o mnie</a>
        <a class="nav__link link" href="#projekty">projekty</a>
        <a class="nav__link link" href="#kontakt">kontakt</a>
      </div>
      <g-link class="button" to="/blog/">Blog</g-link>
    </nav>
    <g-image class="logo" src="~/assets/images/logo.webp" />
  </header>
</template>

<script>
export default {
  name: 'HeaderHome',
};
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 20px;

    &__wrapper {
      display: flex;
      flex-direction: column;
      row-gap: 15px;
    }

    &__link {
      font-family: var(--font-family-secondary);
      display: inline-block;
      padding: 2px 4px;
      cursor: pointer;
    }
  }

  .logo {
    position: absolute;
    top: 34px;
    left: 50%;
    width: clamp(4.375rem, 3.68902445rem + 2.926829vw, 6.25rem);
    transform: translateX(-50%);
    transform-origin: top;
  }
}

@media screen and (min-width: 768px) {
  .header {
    .nav {
      padding: 40px 50px;

      &__wrapper {
        flex-direction: row;
        row-gap: unset;
        column-gap: 32px;
      }

      &__link {
        font-family: var(--font-family-secondary);
      }
    }
  }
}
</style>