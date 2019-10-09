<template>
    <span>
        <v-navigation-drawer
            app
            v-model="drawer"
            class="brown lighten-2"
            dark
            disable-resize-watcher
        >
            <v-list>
                <template v-for="(item, index) in items">
                    <v-list-item :key="index">
                        <router-link :to="item.to">
                            <v-list-item-content>
                                {{ item.title }}
                            </v-list-item-content>
                        </router-link>
                    </v-list-item>
                    <v-divider :key="`divider-${index}`"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app color="brown darken-4" dark>
            <v-btn icon class="hidden-md-and-up" @click="drawer = !drawer">
                <v-icon>mdi-view-headline</v-icon>
            </v-btn>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
            </router-link>
            <v-btn text class="hidden-sm-and-down" to="/menu">Menu</v-btn>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-btn text class="hidden-sm-and-down" to="/sign-in">SIGN IN</v-btn>
            <v-btn color="brown lighten-3" class="hidden-sm-and-down" to="/join"
                >JOIN</v-btn
            >
            <v-btn text class="hidden-sm-and-down" to="/about">ABOUT</v-btn>
        </v-app-bar>
    </span>
</template>

<script>
export default {
    name: "AppNavigation",
    data() {
        return {
            appTitle: "Meal Prep",
            drawer: false,
            items: [
                { title: "Menu", to: "/menu" },
                { title: "Sign In", to: "/sign-in" },
                { title: "Join", to: "/join" },
                { title: "About", to: "/about" }
            ]
        };
    }
};
</script>

<style scoped>
a,
a:visited {
    color: white;
    text-decoration: none;
}
</style>
