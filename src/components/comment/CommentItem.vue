<template>
    <div class="comment-item flex flex-col">
        <div class="comment-container flex gap-2">
            <AAvatar content="A" class="my-3"/>
            <ATypography class="flex-1 h-full">
                <template #title>
                    <span>{{ props.author }}</span>
                    <AChip>AOE</AChip>
                </template>
                <template #subtitle>
                    <slot>
                        {{ props.comment }}
                    </slot>
                </template>
            </ATypography>
        </div>
        <div class="comment-oprated flex justify-around items-center">
            <ABtn icon="i-bx-heart" icon-only class="py-6pt rounded-[50%]" variant="light" :color="color.like">
            </ABtn>
            <ABtn icon="i-bx-dislike" icon-only class="py-6pt rounded-[50%]" variant="light" :color="color.dislike">
            </ABtn>
            <ABtn icon="i-bx-star" icon-only class="py-6pt rounded-[50%]" variant="light" :color="color.favorite">
            </ABtn>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { AAvatar, ABtn,ATypography, AChip } from "anu-vue"
import { ref } from "vue"
import { CommentItemProps } from "./props"
import { useToggle } from "@hook/useToggle"
// component meta

const props = defineProps<CommentItemProps>();

// value

const likeColor = useToggle(["#a8a29e", "#fb7185"])
const disLikeColor = useToggle(["#a8a29e", "#2dd4df"])
const favoriteColor = useToggle(["#a8a29e", "#fbbf24"])
const commentColor = useToggle(["#a8a29e", "#e77332"])
const color = ref({
    like: likeColor.value(),
    dislike: disLikeColor.value(),
    favorite: favoriteColor.value(),
    comment: commentColor.value()
})

</script>