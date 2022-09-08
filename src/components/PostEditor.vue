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
      const post = {
        text: this.newPostTest,
        threadId: this.threadId
      };

      this.newPostTest = "";
      this.$store.dispatch("createPost", post);
    },
  },
};
</script>