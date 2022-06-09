<template>
  <div class="breadcrumbs">
    <g-link aria-label="Przejdź do podstrony zawierającej blog" class="breadcrumbs__item" to="/blog/">Blog</g-link>
    <span class="breadcrumbs__separator">></span>
    <span class="breadcrumbs__item">{{ postTitle }}</span>
  </div>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: {
    postTitle: {
      type: String,
      required: true,
    },
  },
};
</script>
