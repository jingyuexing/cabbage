<script setup lang="ts">
    export interface TabListItemProps {
        value:string
    }
    const props = defineProps<TabListItemProps>()
</script>

<template>
    <div class="tabs-item md:w-30% px-4 py-1 rounded-1.2 hover:bg-white" v-bind="props">
        <slot/>
    </div>
</template>