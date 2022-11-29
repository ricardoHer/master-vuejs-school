<template>
    <div v-if="thread && text" class="col-full push-top">
      <h1>
        Editing <i>{{ thread.title }}</i>
      </h1>
      <ThreadEditor @save="save" @cancel="cancel" />
    </div>
  </template>
  
  <script>
  import ThreadEditor from "@/components/ThreadEditor";
  
  export default {
    components: {
      ThreadEditor,
    },
    props: {
      Id: {
        type: String,
        required: true,
      },
    },
    computed: {
      thread() {
        return this.$store.state.threads[this.id];
      },
      text() {
        return this.$store.state.posts[this.thread.firstPostId].text
      }
    },
    created() {
      this.$store.dispatch('fetchThread', { id: this.id })
        .then(thread => this.$store.dispatch('fetchPost', { id: thread.firstPostId }))
    },
    methods: {
      save({ title, text }) {
        this.$store
          .dispatch("createThread", {
            forumId: this.forum[".key"],
            title,
            text,
          })
          .then((thread) => {
            this.$router.push({
              name: "ThreadShow",
              params: { id: thread[".key"] },
            });
          });
      },
      cancel() {
        this.$router.push({ name: "Forum", params: { id: this.forum[".key"] } });
      },
    },
  };
  </script>
  
  <style scoped>
  </style>