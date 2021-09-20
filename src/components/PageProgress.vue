<template>
  <ul class="pageProgress">
    <li v-for="section in sections" class="pageProgress__section">
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
  right: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transform: translateY(-50%);
  row-gap: 40px;

  &__section {
    button {
      display: block;
      width: 20px;
      height: 20px;
      cursor: pointer;
      border: 2px solid var(--font-color);
      border-radius: 100%;
      outline: none;
      background: none;
    }
  }
}
</style>