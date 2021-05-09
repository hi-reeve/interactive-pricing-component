<script lang="ts">
import { computed, ComputedRef, defineComponent, ref, useCssModule } from "vue";

export default defineComponent({
    name: "Pricing",
    setup() {
        const style = useCssModule();

        const isMonthly = ref<boolean>(true);
        const priceInitial = 16.0;
        const benefitInitial = ref<number>(10000);

        const price: ComputedRef<string> = computed(() => {
            const p = isMonthly
                ? priceInitial
                : priceInitial * 12 - priceInitial * 0.25;
            return p.toFixed(2);
        });
        const benefit: ComputedRef<number> = computed(() => {
            return isMonthly
                ? benefitInitial.value / 1000
                : (benefitInitial.value * 12) / 1000;
        });

        const monthText: ComputedRef<string> = computed(() => {
            return isMonthly ? "month" : "yearly";
        });

        const summaryBenefit = [
            "Unlimited Websites",
            "100% data ownership",
            "Email reports",
        ];

        return {
            style,
            isMonthly,
            price,
            benefitInitial,
            benefit,
            monthText,
            summaryBenefit,
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
                    <span :class="style['pricing__month']">
                        / {{ monthText }}
                    </span>
                </div>
            </div>
            <div :class="style['pricing__options']">
                <v-range
                    v-model="benefitInitial"
                    :max="250000"
                    :min="10000"
                    :step="1000"
                />
                <div :class="style['pricing__options--bottom']">
                    <span :class="style['pricing__options-text']">
                        Monthly Billing
                    </span>
                    <v-switch class="mx-4" v-model="isMonthly" />
                    <span :class="style['pricing__options-text']">
                        Yearly Billing
                    </span>
                    <div :class="style['pricing__discount']">25% discount</div>
                </div>
            </div>
        </div>
        <div :class="style['pricing__footer']">
            <div :class="style['pricing__summary']">
                <div
                    :class="style['pricing__summary-item']"
                    v-for="(item, index) in summaryBenefit"
                    :key="index"
                >
                    <img
                        src="../assets/images/icon-check.svg"
                        :class="style['pricing__summary-item--icon']"
                    />
                    <span :class="style['pricing__summary-item--text']">
                        {{ item }}
                    </span>
                </div>
            </div>
            <div :class="style['pricing__cta-wrapper']">
                <button :class="style['pricing__cta']">Start my trial</button>
            </div>
        </div>
    </div>
</template>

<style module scoped>
.pricing {
    @apply bg-white lg:w-1/3 shadow-lg p-8 rounded-md;
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
    @apply mt-3 py-4;
}
.pricing__options--bottom {
    @apply flex items-center justify-center mt-5;
}
.pricing__options-text {
    @apply text-sm;
}
.pricing__discount {
    @apply ml-3 py-1 px-2 text-light-red bg-light-red-grayish max-w-max text-xs rounded-full;
}
.pricing__footer {
    @apply flex;
}
.pricing__summary {
    @apply w-1/2;
}
.pricing__summary-item {
    @apply text-sm my-2 flex w-full items-center;
}
.pricing__summary-item--icon {
    @apply w-3 h-3;
}
.pricing__summary-item--text {
    @apply ml-2;
}
.pricing__cta-wrapper {
    @apply w-1/2 flex justify-center items-center;
}
.pricing__cta {
    @apply px-4 py-3 min-w-[150px] bg-dark-blue text-pale-blue rounded-full text-xs hover:bg-pale-blue hover:text-dark-blue transition-all duration-300 ease-in-out focus:outline-none;
}
</style>
