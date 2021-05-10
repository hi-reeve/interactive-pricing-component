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
        <div :class="style['main--top']">
            <h1 :class="style.page__title">Simple, traffic-based pricing</h1>
            <h4 :class="style['page__sub-title']">
                Sign-up for our 30-day trial. No credit card required.
            </h4>
        </div>
        <pricing />
        <div :class="style.attribution">
            Challenge by
            <a
                href="https://www.frontendmentor.io?ref=challenge"
                target="_blank"
                >Frontend Mentor</a
            >. Coded by
            <a href="https://www.instagram.com/hi_reeve/">Christopher Reeve</a>.
        </div>
    </div>
</template>

<style module>
.main {
    background: url("@/assets/images/bg-pattern.svg");
    background-repeat: no-repeat;
    background-size: 100% 50%;
    @apply p-8 grid place-items-center h-screen w-screen bg-pale-blue-very;
}
.main--top {
    background: url("@/assets/images/pattern-circles.svg");
    background-position: center;
    background-repeat: no-repeat;
    @apply min-h-[150px] flex flex-col items-center justify-center;
}
.page__title {
    @apply lg:text-4xl text-2xl font-bold text-black;
}
.page__sub-title {
    @apply lg:text-base lg:w-full w-2/3 text-sm text-center mt-3 text-gray-blue font-bold;
}
.attribution{
	@apply lg:mt-0 mt-5 text-center lg:pb-0 pb-5;
}
</style>
