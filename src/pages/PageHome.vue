<template>
  <div class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories" />
  </div>
</template>

<script>
import CategoryList from "../components/CategoryList.vue";

export default {
  mounted() {
    console.log(this.$store.state.categories);
  },
  components: { CategoryList },
  computed: {
    categories() {
      return Object.values(this.$store.state.categories);
    },
  },
  beforeCreate() {
    this.$store.dispatch("fetchAllCategories").then((categories) => {
      categories.forEach((category) => {
        console.log("Category: ", category);
        
        this.$store.dispatch("fetchForums", {
          ids: Object.keys(category.forums),
        });
      });
    });
  },
};
</script>
