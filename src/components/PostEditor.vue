<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        class="form-input"
        v-model="newPostTest"
      ></textarea>
    </div>
    <div class="form-action">
      <button class="btn-blue">Submit post</button>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      newPostTest: "",
    };
  },
  props: {
    threadId: {
        required: true,
        type: String
    }
  },
  methods: {
    save() {
      const postId = "greatPost" + Math.random();
      const post = {
        text: this.newPostTest,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
        userId: "NnooaWj4KHVxbhKwO1pEdfaQDsD2",
        ".key": postId,
      };

      this.newPostTest = "";

      this.$emit('save', { post })
    },
  },
};
</script>