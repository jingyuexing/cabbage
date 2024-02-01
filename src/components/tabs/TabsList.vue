<script setup lang="ts">
    export interface TabsListProps {
        background:string
    }
    export interface TabsListEmits {
    }

    const props =  defineProps<TabsListProps>()
    const bgclass = `bg-${props.background ?? 'gray-300'}`
</script>

<template>
    <div class="tabs-list w-full flex rounded-1.2 py-1 px-1 overflow-hidden justify-around items-center" :class="bgclass" v-bind="props">
        <slot></slot>
    </div>
</template>