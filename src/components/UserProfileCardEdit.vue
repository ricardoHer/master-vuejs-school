<template>
  <div class="col-3 push-top">
    <div class="profile-card">
      <p class="text-center">
        <img :src="user.avatar" alt="" class="avatar-xlarge img-update" />
      </p>

      <div class="form-group">
        <input
          type="text"
          placeholder="Username"
          class="form-input text-lead text-bold"
          v-model="activeUser.username"
        />
      </div>

      <div class="form-group">
        <input
          v-model="activeUser.name"
          type="text"
          placeholder="Full Name"
          class="form-input text-lead"
        />
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          class="form-input"
          id="user_bio"
          placeholder="Write a few words about yourself."
          v-model="activeUser.bio"
        ></textarea>
      </div>

      <div class="stats">
        <span>{{ userPostsCount }} posts</span>
        <span>{{ userThreadsCount }} threads</span>
      </div>

      <hr />

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input
          autocomplete="off"
          class="form-input"
          id="user_website"
          v-model="activeUser.website"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input
          autocomplete="off"
          class="form-input"
          id="user_email"
          v-model="activeUser.email"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input
          autocomplete="off"
          class="form-input"
          id="user_location"
          v-model="activeUser.location"
        />
      </div>

      <div class="btn-group space-between">
        <button @click="cancel" class="btn-ghost">Cancel</button>
        <button @click.prevent="save" type="submit" class="btn-blue">
          Save
        </button>
      </div>
    </div>

    <p class="text-xsmall text-faded text-center">
      Member since june 2003, last visited 4 hours ago
    </p>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      required: true,
      type: Object,
    },
 
  },
  data() {
    return {
      activeUser: { ...this.user },
    };
  },
  methods: {
    save() {
      this.$store.dispatch("updateUser", { ...this.activeUser });
      this.$router.push({ name: "Profile" });
    },
    cancel() {
      this.$router.push({ name: "Profile" });
    },
  },
  computed: {
    userPostsCount() {
      return this.$store.getters.userPostsCount(this.user['.key'])
    },
    userThreadsCount() {
      return this.$store.getters.userThreadsCount(this.user['.key'])
    },
  }
};
</script>

<style scoped>
</style>