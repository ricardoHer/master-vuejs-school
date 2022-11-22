<template>
  <div class="flex-grid">
    <UserProfileCard
      v-if="!edit"
      :user="user"
    />
    <UserProfileCardEdit
      v-if="edit"
      :user="user"
    />
    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead"> {{ user.username }} recent activity </span>
        <a href="#">See only started threads?</a>
      </div>

      <hr />

      <!-- Original activity list -->
      <!-- <div class="activity-list">
          <div class="activity">
              <div class="activity-header">
                  <img
              src="https://i.imgur.com/OqlZN48.jpg"
              alt=""
              class="hide-mobile avatar-small"
            />
            <p class="title">
                How can I chop onions without crying?
              <span>Joker started a topic in Cooking</span>
            </p>
          </div>

          <div class="post-content">
              <div>
                  <p>
                      I absolutely love onions, but they hurt my eyes! Is there a way
                where you can chop onions without crying?
              </p>
            </div>
          </div>

          <div class="thread-details">
              <span>4 minutes ago</span>
            <span>1 comments</span>
          </div>
        </div>
      </div> -->

      <PostList :posts="userPosts" />
    </div>
  </div>
</template>


<script>
import PostList from "@/components/PostList";
import { mapGetters } from "vuex";
import UserProfileCard from "@/components/UserProfileCard.vue";
import UserProfileCardEdit from "../components/UserProfileCardEdit.vue";

export default {
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEdit,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      user: "authUser",
    }),
    userPosts() {
      if (this.user.posts) {
        return Object.values(this.$store.state.posts).filter(
          (post) => post.userId === this.user[".key"]
        );
      }
      return [];
    }
  },
};
</script>

<style scoped>
</style>