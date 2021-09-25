<template>
  <ul class="pageProgress">
    <li v-for="section in sections" class="pageProgress__element">
      <a v-smooth-scroll
         :data-section="section.id"
         :href="'#' + section.id"
         class="pageProgress__link"><span class="sr-only">Przejdź do sekcji {{
          section.id | splitString('', ' ') }}</span>
      </a>
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
    console.log('this.sections: ', this.sections);
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
  }

  &__link {
    position: relative;
    width: 30px;
    height: 30px;
    display: block;

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
      transition: border var(--transition-duration) var(--transition-timing-function);
    }

    @include hover {
      &:before {
        border-color: var(--third-color);
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