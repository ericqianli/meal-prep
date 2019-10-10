import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import firebase from "firebase";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        accessToken: null,
        recipes: [],
        userRecipes: [],
        apiUrl: "https://api.edamam.com/search",
        user: null as (firebase.auth.UserCredential | null),
        isAuthenticated: false
    },
    mutations: {
        setRecipes(state, payload) {
            state.recipes = payload;
        },
        setUserRecipes(state, payload) {
            state.userRecipes = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        },
        setAccessToken: (state, accessToken) => {
            state.accessToken = accessToken;
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
            // return state.user !== null && state.user !== undefined;
        }
    },
    actions: {
        async getRecipes({ state, commit }, plan) {
            try {
                let response = await axios.get(state.apiUrl, {
                    params: {
                        q: plan,
                        app_id: "5b6623d5",
                        app_key: "46674aa2193dbb7b88ffd897331e661a",
                        from: 0,
                        to: 9
                    }
                });
                commit("setRecipes", response.data.hits);
            } catch (error) {
                commit("setRecipes", []);
            }
        },
        async userJoin({ commit }, { email, password }) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    commit("setUser", user);
                    commit("setIsAuthenticated", true);
                    router.push("/about");
                })
                .catch(() => {
                    commit("setUser", null);
                    commit("setIsAuthenticated", false);
                });
        },
        async userLogin({ commit }, { email, password }) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    console.log(
                        "%cuser",
                        "background-color: red; color: white",
                        user
                    );
                    commit("setUser", user);
                    commit("setIsAuthenticated", true);
                    router.push("/about");
                })
                .catch(() => {
                    commit("setUser", null);
                    commit("setIsAuthenticated", false);
                });
        },
        async userSignOut({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit("setUser", null);
                    commit("setIsAuthenticated", false);
                    router.push("/");
                })
                .catch(() => {
                    commit("setUser", null);
                    commit("setIsAuthenticated", false);
                    router.push("/");
                });
        },
        async addRecipe({ state }, payload) {
            const user = state.user;
            if (user == null || user.user == null) {
                return;
            }
            const db = firebase.firestore();
            const userRef = db.collection("users").doc(user.user.uid);
            try {
                await userRef.update({
                    recipes: firebase.firestore.FieldValue.arrayUnion(
                        payload.recipe.label
                    )
                });
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async getUserRecipes({ state, commit }) {
            const user = state.user;
            if (user == null || user.user == null) {
                return;
            }
            const db = firebase.firestore();
            const userRef = db.collection("users").doc(user.user.uid);
            try {
                const doc = await userRef.get();
                if (doc.exists) {
                    const data = doc.data();
                    if (data != null) {
                        commit("setUserRecipes", data.recipes);
                    }
                } else {
                    commit("setUserRecipes", []);
                }
            } catch (error) {
                commit("setUserRecipes", []);
            }
        }
    }
});
