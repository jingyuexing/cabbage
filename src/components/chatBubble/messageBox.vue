<script lang="ts" setup>
    import { defineProps } from "vue"
    interface MessageBoxProps {
        me?:boolean
    }
    const props = defineProps<MessageBoxProps>()
</script>
<template>
    <div class="message-box flex p-1" :class="{'justify-start items-start':!props.me,'justify-end items-end':props.me}" v-bind="props">
        <slot/>
    </div>
</template>