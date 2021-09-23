<template>
  <ul class="pageProgress">
    <li v-for="section in sections" class="pageProgress__element">
      <button></button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PageProgress',
  data() {
    return {
      sections: [],
    };
  },
  mounted() {
    this.sections = document.querySelectorAll('section');
    console.log(document.querySelectorAll('section'));
  },
};
</script>

<style lang="scss" scoped>
.pageProgress {
  position: fixed;
  top: 50%;
  right: 45px;
  display: none;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transform: translateY(-50%);
  row-gap: 40px;

  &__element {
    button {
      position: relative;
      width: 30px;
      height: 30px;

      &:before {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        content: '';
        transform: translate(-50%, -50%);
        border: 2px solid var(--font-color);
        border-radius: 100%;
      }

      &:hover,
      &:focus {

      }

      &:focus {
        outline: var(--outline-size) dotted var(--third-color);
        outline-offset: var(--outline-offset);
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .pageProgress {
    display: flex;
  }
}
</style>