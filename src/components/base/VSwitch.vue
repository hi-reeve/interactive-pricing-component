<script lang="ts">
import { computed, defineComponent, PropType, useCssModule } from "vue";

export default defineComponent({
    name: "VSwitch",
    emits: ["update:modelValue"],
    props: {
        modelValue: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
    },
    setup(props) {
        const style = useCssModule();
        const switchClass = computed(() =>
            props.modelValue
                ? `${style["switch"]}`
                : `${style["switch"]} ${style["switch--active"]}`
        );
        const toggleClass = computed(() =>
            props.modelValue
                ? `${style["switch__toggle"]}`
                : `${style["switch__toggle"]} ${style["switch__toggle--active"]}`
        );
        return {
            style,
            switchClass,
			toggleClass
        };
    },
});
</script>

<template>
    <div :class="switchClass" @click="$emit('update:modelValue', !modelValue)">
        <div :class="toggleClass"></div>
    </div>
</template>

<style module scoped>
.switch {
    @apply w-10 h-5 bg-light-blue-dark rounded-full py-0.5 px-[0.15rem]  flex items-center cursor-pointer;
}
.switch--active {
    @apply bg-cyan-soft;
}
.switch__toggle {
    content: "";
    @apply bg-white block rounded-full w-4 h-4 transform transition-all duration-300 ease-in-out translate-x-0;
}
.switch__toggle--active {
	@apply translate-x-5;
}
</style>
