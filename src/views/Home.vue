<template>
    <span>
        <home-hero></home-hero>
        <home-details />
        <home-plans />
    </span>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

import HomeHero from "@/components/HomeHero";
import HomeDetails from "@/components/HomeDetails";
import HomePlans from "@/components/HomePlans";

// export default class Home extends Vue {}

export default {
    name: "home",
    components: {
        HomeHero,
        HomeDetails,
        HomePlans
    }
};
</script>
