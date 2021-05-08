<script lang="ts">
import { defineComponent, useCssModule } from "vue";

export default defineComponent({
    name: "App",
    setup() {
        const style = useCssModule();
        return {
            style,
        };
    },
});
</script>

<template>
    <div :class="style.main">
        <div>
            <h1 :class="style.page__title">Simple, traffic-based pricing</h1>
            <h4 :class="style['page__sub-title']">
                Sign-up for our 30-day trial. No credit card required.
            </h4>
        </div>
        <pricing />
    </div>
</template>

<style module>
.main {
    @apply p-8 grid place-items-center h-screen w-screen bg-pale-blue-very;
}
.page__title {
    @apply text-4xl font-bold text-black;
}
.page__sub-title {
    @apply text-center mt-3 text-gray-blue font-bold;
}
</style>
