<script lang="ts">
import { computed, ComputedRef, defineComponent, ref, useCssModule } from "vue";

export default defineComponent({
    name: "Pricing",
    setup() {
        const style = useCssModule();

        const isMonthly = ref<boolean>(true);
        const priceInitial = 16.0;
        const benefitInitial = 100;

        const price: ComputedRef<string> = computed(() => {
            const p = isMonthly
                ? priceInitial
                : priceInitial * 12 - priceInitial * 0.25;
            return p.toFixed(2);
        });
        const benefit: ComputedRef<number> = computed(() => {
            return isMonthly ? benefitInitial : benefitInitial * 12;
        });

        const monthText: ComputedRef<string> = computed(() => {
            return isMonthly ? "month" : "yearly";
        });
        return {
            style,
            price,
            benefit,
            monthText,
        };
    },
});
</script>

<template>
    <div :class="style.pricing">
        <div :class="style['pricing__content']">
            <div :class="style['pricing__offers']">
                <div :class="style['pricing__benefit']">
                    {{ benefit }}k Pageviews
                </div>
                <div :class="style['pricing__price-wrapper']">
                    <span :class="style['pricing__price']">${{ price }}</span>
                    <span :class="style['pricing__month']"
                        >/ {{ monthText }}</span
                    >
                </div>
            </div>
            <div :class="style['pricing__options']">
                <input type="range" class="w-full " />
                <div :class="style['pricing__options--bottom']">
                    <span :class="style['pricing__options-text']">Monthly Billing</span>
                    <div class="mx-4">switch</div>
                    <span :class="style['pricing__options-text']">Yearly Billing</span>
                    <div :class="style['pricing__discount']">25% discount</div>
                </div>
            </div>
        </div>
        Unlimited websites 100% data ownership Email reports Start my trial
    </div>
</template>

<style module scoped>
.pricing {
    @apply bg-white lg:w-1/2 shadow-lg p-8 rounded-md;
}
.pricing__offers {
    @apply flex;
}
.pricing__benefit {
    @apply font-bold text-gray-blue tracking-widest uppercase text-sm;
}
.pricing__price-wrapper {
    @apply flex ml-auto;
}
.pricing__price {
    @apply font-bold text-black text-4xl;
}
.pricing__month {
    @apply text-sm my-auto ml-2;
}
.pricing__options {
    @apply py-4;
}
.pricing__options--bottom {
    @apply flex items-center justify-center mt-5;
}
.pricing__options-text{
	@apply  text-sm;
}
.pricing__discount {
    @apply ml-3 py-1 px-2 text-light-red bg-light-red-grayish max-w-max text-xs rounded-full;
}
</style>
