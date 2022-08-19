<template>
  <div class="col-full push-top">
    <h1>Welcome to the Forum</h1>
    <CategoryList :categories="categories"  />
  </div>
</template>

<script>
import sourceData from "@/data.json";
import ThreadList from "../components/ThreadList.vue";
import ForumList from "../components/ForumList.vue";
import CategoryListItem from "../components/CategoryListItem.vue";
import CategoryList from "../components/CategoryList.vue";

console.log(sourceData);

export default {
  components: { ThreadList, ForumList, CategoryListItem, CategoryList },
  data() {
    return {
      categories: Object.values(sourceData.categories),
    };
  },
};
</script>
