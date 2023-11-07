<script lang="ts" setup>
    import { defineProps } from "vue"
    interface MessageMenuWapperProps {
        me?:boolean
        bottom?:boolean
    }
    const props = defineProps<MessageMenuWapperProps>()
</script>
<template>
    <div class="inline-flex gap-1 items-center absolute" :class="{'bottom-1':bottom,'right-1':me,'left-1 flex-row-reverse':!me,'top-1':!bottom}">
        <slot>
        </slot>
    </div>
</template>