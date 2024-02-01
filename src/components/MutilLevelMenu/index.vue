<template>
    <div class="menus w-full flex gap-3 p-1 rounded-3 overflow-hidden" :class="{ 'flex-col': props.direction === 'col', 'flex-row': props.direction === 'row' }">
        <slot>
            <slot name="items dark:color-white">
                <MenuItem v-for="(item, key) in props.items" :key="key">
                {{ item.title }}
                </MenuItem>
            </slot>
        </slot>
    </div>
</template>

<script lang="ts" setup>
import MenuItem from "./MenuItem.vue"
import { MenuProps } from "."
const props = defineProps<MenuProps>()
</script>