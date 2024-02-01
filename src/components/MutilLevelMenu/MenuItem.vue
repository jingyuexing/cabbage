<template>
    <li class="menu-items flex-col flex items-center p-2 rounded-3 hover:bg-gray-300">
        <slot>
        </slot>
        <slot name="subMenu" v-if="!isNone(props.children)">
            <!-- if props.children is have, then render subMenu -->
        </slot>
    </li>
</template>

<script lang="ts" setup>
    import { MenuItemsProps} from "."
    import { isNone } from "@jingyuexing/utils"
    const props = defineProps<MenuItemsProps>()
</script>