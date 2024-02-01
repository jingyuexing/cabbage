<template>
    <div class="sub-menu">
        <slot>
            <div class="title relative">
                <slot name="title">
                    <AAvatar :icon="props.icon"/>
                    <div class="items-title">{{ props.title }}</div>
                </slot>
            </div>
            <div class="content pl-2">
                <slot name="content"></slot>
            </div>
        </slot>
    </div>
</template>

<script lang="ts" setup>
    import { AAvatar } from "anu-vue"
import { SubMenuProps } from "."
const props = defineProps<SubMenuProps>()
</script>