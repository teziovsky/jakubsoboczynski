<template>
  <section id="hero" class="hero">
    <div class="hero__wrapper">
      <p class="hero__greet">Cześć, jestem</p>
      <h1 class="hero__title">Jakub</h1>
      <p class="hero__subtitle">Frontend developer</p>
    </div>
    <a v-smooth-scroll class="hero__cta" href="#projekty">
      <span>Przejdź do projektów</span>
      <svg class="hero__diamant"
           fill="none"
           height="62"
           viewBox="0 0 29 62"
           width="29"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M24.2716 27.66L14.5216 57L4.79141 27.72M24.2716 27.66L27.0431 19.32L14.5216 3L2 19.32L4.79141 27.72M24.2716 27.66L14.5216 15L4.79141 27.72"
              stroke="white"
              stroke-width="3" />
      </svg>
    </a>
  </section>
</template>

<script>
export default {
  name: 'Hero',
};
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 100vh;

  &__wrapper {
    position: absolute;
    top: 45%;
    left: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translate(-50%, -50%);
  }

  &__greet {
    font-family: var(--font-family-secondary);
    font-size: clamp(1rem, 0.5566rem + 1.6694vw, 1.625rem);
    line-height: clamp(1rem, 0.5566rem + 1.6694vw, 1.625rem);
    font-weight: 400;
    margin-bottom: 10px;
  }

  &__title {
    position: relative;
    font-family: var(--font-family-primary);
    font-size: clamp(3.5rem, 1.7262rem + 6.6778vw, 6rem);
    line-height: clamp(3.5rem, 1.7262rem + 6.6778vw, 6rem);
    font-weight: 400;
    margin-bottom: 15px;
    padding-bottom: 30px;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 40px;
      height: 1px;
      background-color: var(--font-color);
      transform: translateX(-50%);
      transition: background var(--transition-duration) var(--transition-timing-function);
    }
  }

  &__subtitle {
    opacity: 0.3;
    font-family: var(--font-family-secondary);
    font-size: clamp(0.75rem, 0.61280484rem + 0.585366vw, 1.125rem);
    line-height: clamp(0.75rem, 0.61280484rem + 0.585366vw, 1.125rem);
    font-weight: 400;
  }

  &__cta {
    position: absolute;
    bottom: 110px;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 5px 20px;
    transform: translateX(-50%);

    @include hover {
      animation: bounce-down 2s 0.2s ease-out infinite;

      span {
        top: -30px;
        opacity: 1;
        transform: translateX(-50%);
      }
    }

    span {
      position: absolute;
      top: -90px;
      left: 50%;
      pointer-events: none;
      opacity: 0;
      font-family: var(--font-family-secondary);
      font-size: clamp(0.75rem, 0.6613rem + 0.3339vw, 0.875rem);
      line-height: clamp(0.75rem, 0.6613rem + 0.3339vw, 0.875rem);
      font-weight: 400;
      white-space: nowrap;
      color: var(--font-color);
      transform: translateX(-50%);
      transition: opacity var(--transition-duration) var(--transition-timing-function), color var(--transition-duration) var(--transition-timing-function), top 0.45s ease-out;
    }
  }

  &__diamant {
    width: 20px;

    path {
      transition: stroke var(--transition-duration) var(--transition-timing-function);
      stroke: var(--font-color);
    }
  }
}

@media screen and (min-width: 768px) {
  .hero {
    &__cta {
      bottom: 60px;
    }
  }
}
</style>
