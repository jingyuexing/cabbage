<script setup lang="ts">
    import { defineProps } from "vue"
    interface BubbleTextProps {
        me?:boolean
    }
    const props = defineProps<BubbleTextProps>()
</script>
<template>
    <div class="message-text text-sm text-initial py-4.5 flex break-words" v-bind="props">
        <slot></slot>
    </div>
</template>