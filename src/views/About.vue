<template>
    <v-container>
        <v-layout column>
            <h1 class="title my-3">My Recipes</h1>
            <div
                v-for="(item, idx) in userRecipes"
                class="subheading mb-2"
                :key="idx"
            >
                {{ item }}
            </div>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: "About",
    computed: {
        userRecipes() {
            console.log(this.$store.state.userRecipes);

            return this.$store.state.userRecipes;
        }
    },
    created() {
        console.log("created");
        this.getRecipes();
    },
    methods: {
        getRecipes() {
            this.$store.dispatch("getUserRecipes");
        }
    }
};
</script>

<style scoped></style>
