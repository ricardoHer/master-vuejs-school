<template>
  <div v-if="forum" class="forum-wrapper">
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{ forum.name }}</h1>
          <p class="text-lead">{{ forum.description }}</p>
        </div>
        <router-link
          class="btn-green btn-small"
          :to="{
            name: 'ThreadCreate',
            params: { forumId: this.forum['.key'] },
          }"
        >
          Start a thread
        </router-link>
      </div>
    </div>
    <div class="col-full push-top">
      <ThreadList :threads="threads" />
    </div>
  </div>
</template>
<script>
import ThreadList from "../components/ThreadList.vue";

export default {
  components: { ThreadList },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  created() {
    this.$store.dispatch("fetchForum", { id: this.id }).then((forum) => {
      this.$store.dispatch("fetchThreads", { ids: forum.threads })
        .then(threads => {
          threads.forEach(thread => this.$store.dispatch('fetchUser', { id: thread.userId }))
        })
    });
  },
  computed: {
    forum() {
      return this.$store.state.forums[this.id];
    },
    threads() {
      return Object.values(this.$store.state.threads).filter(
        (thread) => thread.forumId === this.id
      );
    },
  },
};
</script>

<style scoped>
.forum-wrapper {
  width: 100%;
}
</style>