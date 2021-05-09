<script lang="ts">
import { computed, defineComponent, PropType, ref, useCssModule } from "vue";

export default defineComponent({
    name: "VRange",
    emits: ["update:modelValue"],
    props: {
        modelValue: {
            type: Number as PropType<number>,
            required: true,
        },
        max: {
            type: Number as PropType<number>,
            default: 100,
        },
        min: {
            type: Number as PropType<number>,
            default: 0,
        },
        step: {
            type: Number as PropType<number>,
            default: 1,
        },
    },
    setup(props, { emit }) {
        const style = useCssModule();
        const inputRange = ref<HTMLInputElement | null>(null);
        const rangeValue = ref<string | number>(0);
        const handleInput = (event: InputEvent) => {
            console.log(event);
            if (event.target)
                rangeValue.value = (event.target as HTMLInputElement).value;
            emit("update:modelValue", rangeValue.value);
        };
        return {
            style,
            handleInput,
            inputRange,
            rangeValue,
        };
    },
});
</script>

<template>
    <div :class="style.range__wrapper">
        <input
            type="range"
            :max="max"
            :min="min"
            :step="step"
            :class="style.input__range"
            @input="handleInput"
            ref="inputRange"
        />
        <div :class="style.range">
            <div
                :class="style.range__thumb"
                :style="{
                    left: `${+rangeValue / 100 * 0.01}%`,
                }"
            ></div>
        </div>
    </div>
</template>

<style module scoped>
.range__wrapper {
    @apply relative;
}
.input__range {
    @apply w-full h-2 absolute top-0 left-0 z-50 bg-light-blue-light focus:outline-none rounded-full;
}
.input__range::-webkit-slider-thumb {
    @apply w-12 h-12 cursor-pointer z-[3] relative;
}
.range {
    @apply w-full h-2 bg-light-blue-light rounded-full absolute top-0 left-0 z-[2];
}
.range__thumb {
    @apply bg-cyan-strong w-8 h-8 absolute -top-3 z-[2] rounded-full;
}
</style>
