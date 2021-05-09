<script lang="ts">
import { defineComponent, ref, useCssModule, watchEffect } from "vue";

export default defineComponent({
    name: "Pricing",
    setup() {
        const style = useCssModule();

        const isMonthly = ref<boolean>(true);
        const priceMonthly = ref([4, 8, 16, 24, 32]);
        const benefitMonthly = ref([10, 50, 100, 500, 1000]);
        const currentPrice = ref(priceMonthly.value[0]);
        const currentBenefit = ref(benefitMonthly.value[0]);
        const rangeModel = ref(1);
        const monthText = ref<string>("monthly");
        const benefitText = ref<string>(currentBenefit.value.toString());
        const priceText = ref<string>(currentPrice.value.toString());

        watchEffect(() => {
            if (isMonthly.value) {
                monthText.value = "monthly";
                currentBenefit.value =
                    benefitMonthly.value[rangeModel.value - 1];
                currentPrice.value = priceMonthly.value[rangeModel.value - 1];
            } else {
                monthText.value = "yearly";
                currentBenefit.value =
                    benefitMonthly.value[rangeModel.value - 1] * 12;
                currentPrice.value =
                    priceMonthly.value[rangeModel.value - 1] * 12 -
                    priceMonthly.value[rangeModel.value - 1] * 0.25;
            }
            benefitText.value =
                currentBenefit.value < 1000
                    ? `${currentBenefit.value}k`
                    : `${currentBenefit.value / 1000}M`;

            priceText.value = currentPrice.value.toString();
        });

        const summaryBenefit = [
            "Unlimited Websites",
            "100% data ownership",
            "Email reports",
        ];

        const handleRange = (value: string | number) => {
            switch (value) {
                case "1": {
                    currentBenefit.value = benefitMonthly.value[0];
                    break;
                }
                case "2": {
                    currentBenefit.value = benefitMonthly.value[1];
                    break;
                }
                case "3": {
                    currentBenefit.value = benefitMonthly.value[2];
                    break;
                }
                case "4": {
                    currentBenefit.value = benefitMonthly.value[3];
                    break;
                }
                case "5": {
                    currentBenefit.value = benefitMonthly.value[4];
                    break;
                }
            }
        };

        return {
            style,
            isMonthly,
            rangeModel,
            monthText,
            benefitText,
            priceText,
            summaryBenefit,
            handleRange,
        };
    },
});
</script>

<template>
    <div :class="style.pricing">
        <div :class="style['pricing__content']">
            <div :class="style['pricing__offers']">
                <div :class="style['pricing__benefit']">
                    {{ benefitText }} Pageviews
                </div>
                <div :class="style['pricing__price-wrapper']">
                    <span :class="style['pricing__price']"
                        >${{ priceText }}</span
                    >
                    <span :class="style['pricing__month']">
                        / {{ monthText }}
                    </span>
                </div>
            </div>
            <div :class="style['pricing__options']">
                <v-range
                    v-model="rangeModel"
                    @update:modelValue="handleRange"
                    :max="5"
                    :min="1"
                    :step="1"
                />
                <div :class="style['pricing__options--bottom']">
                    <span :class="style['pricing__options-text']">
                        Monthly Billing
                    </span>
                    <v-switch class="lg:mx-4 mx-3" v-model="isMonthly" />
                    <span :class="style['pricing__options-text']">
                        Yearly Billing
                    </span>
                    <div :class="style['pricing__discount']">
                        25% <span class="lg:block hidden lg:ml-1">discount</span>
                    </div>
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
    @apply flex lg:flex-row flex-col items-center;
}
.pricing__benefit {
    @apply font-bold text-gray-blue tracking-widest uppercase text-sm;
}
.pricing__price-wrapper {
    @apply flex lg:ml-auto lg:mt-0 mt-5;
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
    @apply flex items-center justify-center mt-10;
}
.pricing__options-text {
    @apply lg:text-sm text-xs;
}
.pricing__discount {
    @apply ml-3 py-1 px-2 flex text-light-red bg-light-red-grayish max-w-max text-xs rounded-full;
}
.pricing__footer {
    @apply flex lg:flex-row flex-col items-center;
}
.pricing__summary {
    @apply lg:w-1/2;
}
.pricing__summary-item {
    @apply text-sm my-2 flex w-full items-center lg:justify-start justify-center;
}
.pricing__summary-item--icon {
    @apply w-3 h-3;
}
.pricing__summary-item--text {
    @apply ml-2;
}
.pricing__cta-wrapper {
    @apply lg:w-1/2 flex justify-center items-center;
}
.pricing__cta {
    @apply px-4 py-3 min-w-[150px] bg-dark-blue text-pale-blue rounded-full text-xs  hover:text-white transition-all duration-300 ease-in-out focus:outline-none lg:mt-0 mt-3;
}
</style>
