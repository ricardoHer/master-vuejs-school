<template>
  <div class="col-full">
    <h1>Welcome to the Forum</h1>
    <CategoryListItem v-for="category in categories" :category="category" :key="category['.key']"  />
  </div>
</template>

<script>
import sourceData from "@/data.json";
import ThreadList from "../components/ThreadList.vue";
import ForumList from "../components/ForumList.vue";
import CategoryListItem from "../components/CategoryListItem.vue";

console.log(sourceData);

export default {
  components: { ThreadList, ForumList, CategoryListItem },
  data() {
    return {
      categories: Object.values(sourceData.categories),
      posts: sourceData.posts,
      users: sourceData.users,
    };
  },
};
</script>
