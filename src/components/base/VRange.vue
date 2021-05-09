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
    setup(props) {
        const style = useCssModule();
        const value = ref(0);

        const progressFilled = computed(() => {});
        // const progressMax = props.max > 100 ? props.max - (props.max / 100)
        const handleDrag = (event: DragEvent) => {
            const elm = event.target as HTMLDivElement;
            elm.classList.add(style["range__thumb--dragging"]);
            if (event.offsetX > 0) {
                if (value.value > props.max - 5) {
                    // value.value = props.max - 5;
                    return;
                }
                value.value += props.step;
            } else {
                if (value.value === 0) {
                    // value.value = 0;
                    return;
                }
                value.value -= props.step;
            }
        };
        const handleDragEnd = () => {
            if (value.value === props.max - 5) {
                value.value = props.max;
            } else {
                value.value;
            }
        };
        const valueToPercent = computed(() => {
            return value.value * 0.1;
        });
        return {
            style,
            handleDrag,
            handleDragEnd,
            value,
            valueToPercent,
        };
    },
});
</script>

<template>
    {{ valueToPercent }}
    <div :class="style.range">
        <div
            :class="style.range__progress"
            :style="{
                width: `${value}%`,
            }"
        ></div>
        <div
            :class="style.range__thumb"
            @drag="handleDrag"
            @dragend="handleDragEnd"
            :style="{
                left: `${value === 0 ? value : value - 5}%`,
            }"
        >
            <img
                src="../../assets/images/icon-slider.svg"
                :class="style['range__thumb-icon']"
            />
        </div>
    </div>
</template>

<style module scoped>
.range {
    @apply w-full h-2 bg-light-blue-light rounded-full relative;
}
.range__progress {
    @apply bg-cyan-soft h-full rounded-full;
}
.range__thumb {
    @apply bg-cyan-strong w-8 h-8 absolute -top-3 rounded-full shadow-lg flex items-center justify-center cursor-pointer;
}
.range__thumb-icon {
    @apply w-4 h-3 select-none;
}
.range__thumb--dragging {
    @apply cursor-pointer;
}
</style>
