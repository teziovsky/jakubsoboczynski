<template>
  <section id="hero" class="hero">
    <div class="hero__wrapper">
      <p class="hero__greet">Cześć, jestem</p>
      <h1 class="hero__title">Jakub</h1>
      <p class="hero__subtitle">Frontend developer</p>
    </div>
    <a class="hero__cta" href="#projekty">
      <span>Przejdź do projektów</span>
      <svg class="hero__diamant"
           fill="none"
           height="36"
           viewBox="0 0 17 36"
           width="17"
           xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i)">
          <path class="hero__diamant_path"
                d="M24.2716 27.66L14.5216 57L4.79141 27.72M24.2716 27.66L27.0431 19.32L14.5216 3L2 19.32L4.79141 27.72M24.2716 27.66L14.5216 15L4.79141 27.72"
                stroke="white"
                stroke-width="3" />
        </g>
        <defs>
          <filter id="filter0_i"
                  color-interpolation-filters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="61.2207"
                  width="28.3918"
                  x="0.325684"
                  y="0.535828">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha"
                           result="hardAlpha"
                           type="matrix"
                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset />
            <feGaussianBlur stdDeviation="50" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow" />
          </filter>
        </defs>
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
    font-size: clamp(0.875rem, 0.6976rem + 0.6678vw, 1.125rem);
    font-weight: 400;
    line-height: clamp(0.875rem, 0.6976rem + 0.6678vw, 1.125rem);
    opacity: 0.3;
  }

  &__cta {
    position: absolute;
    bottom: 60px;
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
      span {
        transform: translate(-50%, -70px);
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
      bottom: 0;
      left: 50%;
      transition: opacity 0.2s, transform 0.2s;
      transform: translate(-50%, 0);
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      color: var(--font-color);
    }
  }

  &__diamant {
    &_path {
      transform: scale(0.6);
    }
  }
}
</style>
