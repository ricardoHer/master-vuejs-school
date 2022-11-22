<template>
  <div class="col-large push-top" v-if="thread && user">
    <h1>{{ thread.title }}</h1>
    <p>
      By <a href="#" class="link-unstyled">{{ user.name }}</a
      >, <AppDate :timeStamp="thread.publishedAt" />.
      <span
        style="float: right; margin-top: 2px"
        class="hide-mobile text-faded text-small"
        >{{ repliesCount }} replies by
        {{ contributorsCount }} contributors</span
      >
    </p>
    <PostList :posts="posts" />
    <PostEditor :threadId="id" />
  </div>
</template>
<script>
import firebase from "firebase";
import PostList from "@/components/PostList";
import PostEditor from "@/components/PostEditor";
import AppDate from "../components/AppDate.vue";
import { countObjectProperties } from "@/utils";

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
  created() {
    // fetch thread
    firebase
      .database()
      .ref("threads")
      .child(this.id)
      .once("value", (snapshot) => {
        const thread = snapshot.val();
        this.$store.commit("setThread", {
          threadId: snapshot.key,
          thread: { ...thread, ".key": snapshot.key },
        });

        // fetch user
        firebase
          .database()
          .ref("users")
          .child(thread.userId)
          .once("value", (snapshot) => {
            const user = snapshot.val();
            this.$store.commit("setUser", {
              userId: snapshot.key,
              user: { ...user, ".key": snapshot.key },
            });
          });

        Object.keys(thread.posts).forEach((postId) => {
          // fetch post
          firebase
            .database()
            .ref("posts")
            .child(postId)
            .once("value", (snapshot) => {
              const post = snapshot.val();
              this.$store.commit("setPost", {
                postId: snapshot.key,
                post: { ...post, ".key": snapshot.key },
              });

              // fetch user
              firebase
                .database()
                .ref("users")
                .child(post.userId)
                .once("value", (snapshot) => {
                  const user = snapshot.val();
                  this.$store.commit("setUser", {
                    userId: snapshot.key,
                    user: { ...user, ".key": snapshot.key },
                  });
                });
            });
        });
      });
  },
  mounted() {},
  computed: {
    posts() {
      const postsId = Object.values(this.thread.posts);
      return Object.values(this.$store.state.posts).filter((post) =>
        postsId.includes(post[".key"])
      );
    },
    repliesCount() {
      return this.$store.getters.threadRepliesCount(this.thread[".key"]);
    },
    contributorsCount() {
      return countObjectProperties(this.thread.contributors);
    },
    thread() {
      return this.$store.state.threads[this.$route.params.id];
    },
    user() {
      return this.$store.state.users[this.thread.userId];
    },
    creator() {
      return this.$store.state.users[this.$store.state.threads[this.id].userId];
    },
  },
};
</script> 