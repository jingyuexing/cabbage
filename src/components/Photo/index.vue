<script lang="ts" setup>
let { src = "", alt = "" } = defineProps<{
  src?: string;
  alt?: string;
}>();
</script>
<template>
  <div
    class="photo overflow-hidden relative inline-block vertical-bottom"
    >
    <img
      class="object-cover max-h-100% max-w-100% min-h-100% min-w-100% vertical-bottom"
      :src="src"
      :alt="alt"
    />
    <div class="absolute top-0 left-0 w-full h-full">
        <slot></slot>
    </div>
  </div>
</template>