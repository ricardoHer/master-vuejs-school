<template>
  <div class="col-large push-top">
    <h1>{{ thread.title }}</h1>
    <p>
      By <a href="#" class="link-unstyled">{{creator.username}}</a>,
      <AppDate :timeStamp="thread.publishedAt" />.
      <span
        style="float: right; margin-top: 2px"
        class="hide-mobile text-faded text-small"
        >3 replies by 3 contributors</span
      >
    </p>
    <PostList :posts="posts" />
    <PostEditor :threadId="id" />
  </div>
</template>
<script>
import PostList from "@/components/PostList";
import PostEditor from "@/components/PostEditor";
import AppDate from "../components/AppDate.vue";

export default {
  components: {
    PostList,
    PostEditor,
    AppDate,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  mounted() {
    console.log(this.$route.params.id);
  },
  computed: {
    posts() {
      const postsId = Object.values(this.thread.posts);
      return Object.values(this.$store.state.posts).filter((post) =>
        postsId.includes(post[".key"])
      );
    },
    thread() {
      return this.$store.state.threads[this.$route.params.id]
    },
    creator() {
      return this.$store.state.users[this.$store.state.threads[this.id].userId]
    }
  }
};
</script> 