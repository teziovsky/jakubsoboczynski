<template>
  <section id="hero" class="hero">
    <p class="hero__greet">Cześć, jestem</p>
    <h1 class="hero__title">Jakub</h1>
    <p class="hero__subtitle">Frontend developer</p>
    <a class="hero__cta" href="#projekty">
      <span>Przejdź do projektów</span>
      <g-image class="hero__diamant" src="~/assets/images/icons/diamant.webp" />
    </a>
  </section>
</template>

<script>
export default {
  name: 'Hero',
};
</script>

<style lang="scss" scoped>
@keyframes bounce-down {
  0% {
    transform: translateX(-50%) translateY(0);
  }
  10% {
    transform: translateX(-50%) translateY(0);
  }
  30% {
    transform: translateX(-50%) translateY(20px);
  }
  50% {
    transform: translateX(-50%) translateY(0);
  }
  57% {
    transform: translateX(-50%) translateY(0);
  }
  64% {
    transform: translateX(-50%) translateY(0);
  }
  100% {
    transform: translateX(-50%) translateY(0);
  }
}

.hero {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;

  &__wrapper {
    position: absolute;
    top: 45%;
    left: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    transform: translate(-50%, -50%);
  }

  &__greet {
    font-family: var(--font-family-secondary);
    font-size: clamp(1rem, 0.5566rem + 1.6694vw, 1.625rem);
    font-weight: 400;
    line-height: clamp(1rem, 0.5566rem + 1.6694vw, 1.625rem);
    margin-bottom: 10px;
  }

  &__title {
    font-family: var(--font-family-primary);
    font-size: clamp(3.5rem, 1.7262rem + 6.6778vw, 6rem);
    font-weight: 400;
    line-height: clamp(3.5rem, 1.7262rem + 6.6778vw, 6rem);
    position: relative;
    margin-bottom: 15px;
    padding-bottom: 30px;

    &:after {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 40px;
      height: 1px;
      content: '';
      transform: translateX(-50%);
      background-color: var(--font-color);
    }
  }

  &__subtitle {
    font-family: var(--font-family-secondary);
    font-size: clamp(0.75rem, 0.61280484rem + 0.585366vw, 1.125rem);
    font-weight: 400;
    line-height: clamp(0.75rem, 0.61280484rem + 0.585366vw, 1.125rem);
    opacity: 0.3;
  }

  &__cta {
    position: absolute;
    bottom: 110px;
    left: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    padding: 10px 20px;
    cursor: pointer;
    transform: translateX(-50%);

    &:hover,
    &:focus {
      animation: bounce-down 2s 0.2s ease-out infinite;

      span {
        top: -20px;
        transform: translateX(-50%);
        opacity: 1;
      }
    }

    &:focus {
      outline: 2px dotted var(--third-color);
    }

    span {
      font-family: var(--font-family-secondary);
      font-size: clamp(0.75rem, 0.6613rem + 0.3339vw, 0.875rem);
      font-weight: 400;
      line-height: clamp(0.75rem, 0.6613rem + 0.3339vw, 0.875rem);
      position: absolute;
      top: -90px;
      left: 50%;
      transition: opacity 0.2s, top 0.45s ease-out;
      transform: translateX(-50%);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      color: var(--font-color);
    }
  }

  &__diamant {
    width: 20px;
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
