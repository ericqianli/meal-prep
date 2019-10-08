<template>
    <span>
        <home-hero></home-hero>
    </span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import HomeHero from "@/components/HomeHero";

// export default class Home extends Vue {}

export default {
    name: "home",
    components: {
        HomeHero
    }
};
</script>
