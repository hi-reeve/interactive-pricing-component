<script lang="ts">
import { defineComponent, onMounted, PropType, ref, useCssModule } from "vue";

export default defineComponent({
    name: "VRange",
    emits: ["update:modelValue"],
    props: {
        modelValue: {
            type: [Number, String] as PropType<number | string>,
            required: true,
        },
        max: {
            type: [Number, String] as PropType<number | string>,
            default: 100,
        },
        min: {
            type: [Number, String] as PropType<number | string>,
            default: 0,
        },
        step: {
            type: [Number, String] as PropType<number | string>,
            default: 1,
        },
    },
    setup(props, { emit }) {
        const style = useCssModule();

        const inputRange = ref<HTMLInputElement | null>(null);
        const rangeValue = ref<string | number>(0);
        const calculateThumbLeft = (value: string | number) => {
            rangeValue.value =
                ((+value - +props.min) / (+props.max - +props.min)) * 100;
            if (inputRange.value)
                inputRange.value.style.background = `linear-gradient(to right, var(--strong-cyan) 0%, var(--strong-cyan) ${rangeValue.value}%, var(--light-gray-blue-2) ${rangeValue.value}%, var(--light-gray-blue-2) 100%)`;
        };

        const handleInput = (event: Event) => {
            let value;
            if (event.target) {
                value = (event.target as HTMLInputElement).value;
                calculateThumbLeft(value);
            }
            emit("update:modelValue", value);
        };
        onMounted(() => {
            calculateThumbLeft(props.modelValue);
        });
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
            @input="handleInput($event)"
            ref="inputRange"
            :value="modelValue"
            aria-label=""
            title="pricing"
            aria-labelledby=""
        />
        <div :class="style.range">
            <div
                :class="style.range__thumb"
                :style="{
                    left: `${+rangeValue}%`,
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
    @apply w-full h-2 absolute top-0 left-0 z-[3] bg-light-blue-light focus:outline-none rounded-full appearance-none;
}
.input__range::-webkit-slider-thumb {
    background: url("@/assets/images/icon-slider.svg");
    background-position: center;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    box-shadow: 0px 10px 20px 0px rgba(16, 213, 194, 0.7);
    @apply w-10 h-10 cursor-pointer  relative appearance-none bg-cyan-strong rounded-full active:cursor-[grabbing] hover:opacity-75 transition-all duration-300 ease-in-out;
}
</style>
