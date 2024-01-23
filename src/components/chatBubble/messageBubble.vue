<script lang="ts" setup>
    interface BubbleWapperProps {
        me?:boolean
    }
    const props = defineProps<BubbleWapperProps>()
</script>
<template>
<div class="message-wapper relative m-0 overflow-hidden p-3 shadow" :class="{'rounded-r-3 rounded-lb-3':!me,'rounded-l-3 rounded-rb-3':me}" v-bind="props">
    <slot/>
</div>    
</template>