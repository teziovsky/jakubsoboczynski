<template>
  <header class="header">
    <nav class="nav">
      <g-link class="button" to="/">Portfolio</g-link>
    </nav>
    <g-image class="logo" src="~/assets/images/logo.webp" />
  </header>
</template>

<script>
export default {
  name: 'HeaderBlog',
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
    }
  }
}
</style>
