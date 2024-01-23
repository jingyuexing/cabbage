<template>
    <ACard title="hello world">
        <template #title>
            <ATypography>
                <template #title>
                    <div class="flex gap-2 mb-4 flex-col justify-between md:flex-row">
                        <div class="title-text text-lg font-bold">
                            this is title
                        </div>
                        <div class="post-star self-center">
                            <ARating v-model="rating" halve readonly />
                        </div>
                    </div>
                </template>
                <template #subtitle>
                    <div class="flex gap-2 justify-between flex-col md:flex-row">
                        <div class="">author</div>
                        <div class="post-meta-data flex-col md:flex-row items-start sm:items-center flex gap-2">
                            <div class="create-at text-sky-400 flex items-center gap-1">
                                <i class="i-bx-time self-center"></i>
                                <span>2023-11-26</span>
                            </div>
                            <div class="like text-rose-400 flex items-center gap-1">
                                <i class="i-bx-like self-center"></i>
                                <span>{{ meta.like }}</span>
                            </div>
                            <div class="diss text-teal-400 flex items-center gap-1">
                                <i class="i-bx-dislike self-center"></i>
                                <span>{{ meta.dislike }}</span>
                            </div>
                            <div class="favorite text-amber-400 flex items-center gap-1">
                                <i class="i-bx-star self-center"></i>
                                <span>{{ meta.favorite }}</span>
                            </div>
                        </div>
                    </div>
                </template>
            </ATypography>
        </template>
        <div class="a-card-body">
            <div class="post-content">
                <p class="indent-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing, elit. Quos ipsa est illo deleniti commodi, provident
                    veritatis aliquam maxime libero. Consectetur aliquam vitae accusantium praesentium eaque autem
                    consequuntur magnam repudiandae alias.
                </p>
                <p class="indent-4">
                    Lorem ipsum dolor sit amet, consectetur, adipisicing elit. Omnis doloribus a, eligendi illum placeat
                    aliquam consequuntur, odio est maiores cumque, quidem voluptates explicabo alias adipisci, fugiat
                    laudantium magnam expedita velit!

                </p>
            </div>
            <div class="post-operation w-full md:w-50% items-center mx-auto flex gap-2 justify-around md:items-center p-3">
                <ABtn @click="postLikeHandler" icon="i-bx-heart" icon-only class="w-20pt h-40px px-6pt py-6pt rounded-[50%]"
                    variant="light" color="#fb7185">
                    <ATooltip text="like" />
                </ABtn>
                <ABtn @click="postDissLikeHandler" icon="i-bx-dislike" icon-only
                    class="w-20pt h-40px px-6pt py-6pt rounded-[50%]" variant="light" color="#2dd4bf">
                    <ATooltip text="diss like" />
                </ABtn>
                <ABtn @click="postFavoriteHandler" icon="i-bx-star" icon-only
                    class="w-20pt h-40px px-6pt py-6pt rounded-[50%]" variant="light" color="#fbbf24">
                    <ATooltip text="favorite" />
                </ABtn>
                <ABtn @click="toggleColorHandler"
                    icon="i-bx-star"
                    class="w-20pt h-40px px-6pt py-6pt rounded-[50%]" 
                    icon-only
                    :color="toggleValue"
                    variant="light">
                </ABtn>
            </div>
        </div>
    </ACard>
</template>

<script lang="ts" setup>
import { ACard, ATypography, ABtn, ATooltip, ARating } from "anu-vue"
import { ref, computed, watch } from "vue"
import { weigthVariance } from "@common/utils"
import { useToggle } from "@hook/useToggle"
const meta = ref({
    like: 0,
    dislike: 0,
    favorite: 0
})

const toggle = useToggle(["#fb7185", "#fbbf24", "#2dd4df"])

const rating = computed(() => {
    const variance = weigthVariance([meta.value.like, meta.value.dislike, meta.value.favorite], [0.6, -0.5, 0.89])
    return normalization(variance, [0.5, 5]);
})

const toggleValue = ref(toggle.value())


const normalization = (x: number, range: [max: number, min: number]) => {
    let [max, min] = range
    return x - min / max - min
}

// post operation
const postLikeHandler = () => {
    meta.value.like++
}

const postDissLikeHandler = () => {
    meta.value.dislike++

}

const postFavoriteHandler = () => {
    meta.value.favorite++

}

const toggleColorHandler = () => {
    toggle.toggle()
    toggleValue.value = toggle.value()
}

watch(rating, () => {
    console.log(rating.value)
})

</script>