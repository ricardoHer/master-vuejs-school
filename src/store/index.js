import Vue from "vue";
import Vuex from "vuex";
import sourceData from "@/data";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: "VXjpr2WHa8Ux4Bnggym8QFLdv5C3"
  },

  getters: {
    authUser(state) {
      return state.users[state.authId];
    }
  },

  actions: {
    createPost({commit, state}, post) {
      const postId = "greatPost" + Math.random();

      post[".key"] = postId;
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000)
   
      commit("setPost", { postId, post });
      commit("appendPostToThread", { threadId: post.threadId, postId });
      commit("appendPostToUSer", { userId: post.userId, postId });
    },

    createThread({ state, commit, dispatch }, { forumId, title, text }) {
      return new Promise((resolve, reject) => {
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)
        const threadId = "greatThread" + Math.random();
        const thread = {
          '.key': threadId,
          title,
          forumId,
          publishedAt,
          userId,
        }
  
        commit('setThread', { threadId, thread })
        commit('appendThreadToForum', { forumId, threadId })
        commit('appendThreadToUser', { userId, threadId })
  
        dispatch('createPost', { text, threadId })
        resolve(state.threads[threadId])
      })
    },

    updateUser({ commit }, user) {
      commit("setUser", { userId: user[".key"], user });
    }
  },
  mutations: {
    setPost(state, { postId, post }) {
      Vue.set(state.posts, postId, post);
      console.log('Posts: ', state.posts)
    },
    setUser(state, { user, userId }) {
      Vue.set(state.users, userId, user);
    },
    setThread(state, { threadId, thread }) {
      Vue.set(state.threads, threadId, thread);
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads[threadId];

      if (!thread.posts) {
        Vue.set(thread, 'posts', {})
      }

      Vue.set(thread.posts, postId, postId);
    },
    appendPostToUSer(state, { postId, userId }) {
      const user = state.users[userId];

      if (!user.posts) {
        Vue.set(user, 'posts', {})
      }

      Vue.set(user.posts, postId, postId);
    },
    appendThreadToForum(state, {forumId, threadId}) {
      const forum = state.forums[forumId];

      if (!forum.threads) {
        Vue.set(forum, 'threads', {});
      }

      Vue.set(forum.threads, threadId, threadId);
    },
    appendThreadToUser(state, {userId, threadId}) {
      const user = state.users[userId];

      console.log('state users: ', state.users)

      console.log('Que merda: ', user)

      if (!user.threads) {
        Vue.set(user, 'threads', {});
      }

      Vue.set(user.threads, threadId, threadId);
    }
  }
});
