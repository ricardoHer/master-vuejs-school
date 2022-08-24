<template>
  <div class="col-full push-top">
    <h1>{{ category.name }}</h1>
    <CategoryListItem :category="category" />
  </div>
</template>
<script>
import CategoryListItem from "../components/CategoryListItem.vue";

export default {
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  computed: {
    category() {
      return this.$store.state.categories[this.id];
    },
  },
  components: { CategoryListItem },
};
</script>
<style scoped>
.category-wrapper {
  width: 100%;
}
</style>