import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import { countObjectProperties } from "@/utils";

// To test a thread http://localhost:8080/thread/-KsjWehQ--apjDBwSBCY

Vue.use(Vuex);

const makeAppendChildToParentMutation = ({ parent, child }) => (
  state,
  { childId, parentId }
) => {
  const resource = state[parent][parentId];

  if (!resource[child]) {
    Vue.set(resource, child, {});
  }

  Vue.set(resource[child], childId, childId);
};

export default new Vuex.Store({
  state: {
    categories: {},
    forums: {},
    threads: {},
    posts: {},
    users: {},
    authId: "VXjpr2WHa8Ux4Bnggym8QFLdv5C3"
  },

  getters: {
    authUser(state) {
      // return state.users[state.authId];
      return {};
    },
    userThreadsCount: state => id =>
      countObjectProperties(state.users[id].threads),
    userPostsCount: state => id => countObjectProperties(state.users[id].posts),
    threadRepliesCount: state => id =>
      countObjectProperties(state.threads[id].posts) - 1
  },

  actions: {
    createPost({ commit, state }, post) {
      const postId = "greatPost" + Math.random();

      post[".key"] = postId;
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);

      commit("setPost", { postId, post });
      commit("appendPostToThread", {
        parentId: post.threadId,
        childId: postId
      });
      commit("appendPostToUSer", { parentId: post.userId, childId: postId });
      return Promise.resolve(state.posts[postId]);
    },

    createThread({ state, commit, dispatch }, { forumId, title, text }) {
      return new Promise((resolve, reject) => {
        const userId = state.authId;
        const publishedAt = Math.floor(Date.now() / 1000);
        const threadId = "greatThread" + Math.random();
        const thread = {
          ".key": threadId,
          title,
          forumId,
          publishedAt,
          userId
        };

        commit("setThread", { threadId, thread });
        commit("appendThreadToForum", { parentId: forumId, childId: threadId });
        commit("appendThreadToUser", { parentId: userId, childId: threadId });

        dispatch("createPost", { text, threadId }).then(post => {
          commit("setThread", {
            threadId,
            thread: { ...thread, firstPostId: post[".key"] }
          });
        });
        resolve(state.threads[threadId]);
      });
    },

    updateUser({ commit }, user) {
      commit("setUser", { userId: user[".key"], user });
    },

    fetchThread({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'threads', id, emoji: 'Emoji do fetch threads' })
    },

    fetchUser({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'users', id, emoji: 'Emoji do fetch users' })
    },

    fetcPost({ dispatch }, { id }) {
      return dispatch('fetchItem', { resource: 'posts', id, emoji: 'Emoji do fetch post' })
    },

    fetchPosts({dispatch}, {ids}) {
      return dispatch('fetchItems', { resource: 'posts', emoji: 'emoji dos fetchPosts', ids })
    },

    fetchForums({dispatch}, {ids}) {
      return dispatch('fetchItems', { resource: 'forums', emoji: 'emoji dos fetchforums', ids })
    },

    fetchAllCategories({state, commit}) {
      console.log('Firebase', 'Emoji da Categories', 'all');
      return new Promise((resolve, reject) => {
        firebase.database().ref('categories').once('value', snapshot => {
          const categoriesObject = snapshot.val()
          Object.keys(categoriesObject).forEach(categoryId => {
            const category = categoriesObject[categoryId]
            commit('setItem', { resource: 'categories', id: categoryId, item: category })
          })
        })
        resolve(Object.values(state.categories))
      })
    },

    fetchItem({ state, commit }, { id, emoji, resource }) {
      console.log("Firebase Fetch Item", emoji, id);

      return new Promise((resolve, reject) => {
        firebase
        .database()
        .ref(resource)
        .child(id)
        .once("value", (snapshot) => {
          const item = snapshot.val();
          commit("setItem", {
            resource,
            id: snapshot.key,
            item,
          });
          resolve(state[resource][id]);
        });
      });
    },

    fetchItems({dispatch}, {ids, resource, emoji}) {
      return Promise.all(ids.map(id => dispatch('fetchItem', { id, resource, emoji })))
    }
  },
  mutations: {
    setPost(state, { postId, post }) {
      Vue.set(state.posts, postId, post);
      console.log("Posts: ", state.posts);
    },
    setUser(state, { user, userId }) {
      Vue.set(state.users, userId, user);
    },
    setThread(state, { threadId, thread }) {
      Vue.set(state.threads, threadId, thread);
    },

    setItem(state, { item, id, resource }) {
      item['.key'] = id;
      Vue.set(state[resource], id, item);
    },
    appendPostToThread: makeAppendChildToParentMutation({
      parent: "threads",
      child: "posts"
    }),

    appendPostToUSer: makeAppendChildToParentMutation({
      parent: "users",
      child: "posts"
    }),

    appendThreadToForum: makeAppendChildToParentMutation({
      parent: "forums",
      child: "threads"
    }),

    appendThreadToUser: makeAppendChildToParentMutation({
      parent: "users",
      child: "threads"
    })
  }
});
