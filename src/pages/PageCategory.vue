<template>
  <div v-if="category" class="col-full push-top">
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
  created() {
    this.$store.dispatch("fetchCategory", { id: this.id }).then((category) => {
      this.$store.dispatch("fetchForums", {
        ids: category.forums,
      });
    });
  },
  components: { CategoryListItem },
};
</script>
<style scoped>
.category-wrapper {
  width: 100%;
}
</style>