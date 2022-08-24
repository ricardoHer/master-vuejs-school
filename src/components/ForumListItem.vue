<template>
  <div class="forum-listing">
    <div class="forum-details">
      <router-link
        class="text-xlarge"
        :to="{ name: 'Forum', params: { id: forum['.key'] } }"
      >
        {{ forum.name }}</router-link
      >
      <p>{{ forum.description }}</p>
    </div>

    <div class="threads-count">
      <p>
        <span class="count">{{ threadsCount }}</span>
      </p>
      {{ threadsCount === 1 ? "thread" : "threads" }}
    </div>

    <div class="last-thread">
      <!-- TODO: Implement Later -->
      <!-- <img
        class="avatar"
        src="https://pbs.twimg.com/profile_images/719242842598699008/Nu43rQz1_400x400.jpg"
        alt=""
      />
      <div class="last-thread-details">
        <a href="thread.html">Post Reactions</a>
        <p class="text-xsmall">
          By <a href="profile.html">Rolf Haug</a>, a month ago
        </p>
      </div> -->
    </div>
  </div>
</template>
<script>
import { countObjectProperties } from "@/utils";

export default {
  props: {
    forum: {
      required: true,
      type: Object,
    },
  },
  computed: {
    threadsCount() {
      return countObjectProperties(this.forum.threads);
    },
  },
};
</script>


<style scoped>
</style>