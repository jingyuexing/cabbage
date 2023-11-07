<script setup lang="ts">
    import { defineProps } from "vue"
    interface CalendarItemProps {
        value:string
        key:string
        current?:boolean
        disable?:boolean
    }
    const props = defineProps<CalendarItemProps>()

    const value = props.value
</script>

<template>
    <div class="calendar-item relative p-2 flex justify-center text-center rounded-lg box-border items-center text-center" v-bind="props">
        <slot></slot>
    </div>
</template>