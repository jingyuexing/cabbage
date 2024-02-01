<script setup lang="ts">
    import { useSlots } from "vue"
    export interface TabsProps {
        defaultValue:string
    }
    import { defineProps } from "vue"

    const props = defineProps<TabsProps>()
    const slots = useSlots()
</script>

<template>
    <div class="tabs" v-bind="props">
        <slot></slot>
    </div>
</template>