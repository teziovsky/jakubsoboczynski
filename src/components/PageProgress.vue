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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
  row-gap: 40px;

  &__element {
    button {
      position: relative;
      width: 30px;
      height: 30px;

      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        border: 2px solid var(--font-color);
        border-radius: 100%;
        transform: translate(-50%, -50%);
      }

      @include hover {

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