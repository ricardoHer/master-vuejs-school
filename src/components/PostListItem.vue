<template>
  <div class="post" v-if="post && user">
    <div class="user-info">
      <a href="#" class="user-name">{{ user.name }}</a>

      <a href="#">
        <img class="avatar-large" :src="user.avatar" alt="" />
      </a>

      <p class="desktop-only text-small">{{ userThreadCount }} posts</p>
      <p class="desktop-only text-small">{{ userPostCount }} posts</p>
    </div>

    <div class="post-content">
      <div>
        {{ post.text }}
      </div>
    </div>
    <div class="post-date text-faded">
      <AppDate :timeStamp="post.publishedAt" />
    </div>
  </div>
</template>
<script>

export default {
  components: {},
  props: {
    post: {
      required: true,
      type: Object,
    },
  },
  computed: {
    user() {
      return this.$store.state.users[this.post.userId];
    },
    userPostCount() {
      return this.$store.getters.userPostsCount(this.post.userId)
    },
    userThreadCount() {
      return this.$store.getters.userThreadsCount(this.post.userId)
    }
  },
};
</script>