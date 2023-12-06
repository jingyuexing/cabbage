<template>
    <div class="captcha-container flex w-fit flex-col justify-center items-center">
        <span class="flex items-center">
            <span class="text-md flex font-bold text-black dark:text-white dark:text-op-50 flex-wrap">请在图中选中图中的文字</span>
            <Photo class="rounded-4" :src="$oauth.image.thumb"></Photo>
        </span>
        <div class="photo overflow-hidden w-200px m-10px relative inline-block vertical-bottom rounded-3" @click="handler">
            <img ref="photo" class="object-cover max-h-100% max-w-100% min-h-100% min-w-100% vertical-bottom"
                :src="$oauth.image.base64" />
            <div class="w-full h-full absolute top-0 left-0" ref="pointContainer">
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

import { Photo } from "../Photo"
import { ref, onMounted, watch } from "vue";
import { CaptchaEvent } from "./props"
import { OauthStore } from "@store/oauth";
const emits = defineEmits<CaptchaEvent>()
const photo = ref<HTMLElement>()
const count = ref(0)
const pointContainer = ref<HTMLElement>()
const $oauth = OauthStore()
let points: number[] = []

onMounted(() => {
    $oauth.getCaptcha()
})
const handler = (e: MouseEvent) => {
    e.stopPropagation();
    if (count.value < $oauth.image.max) {
        const react = photo.value?.getBoundingClientRect();
        if (react) {
            const x = e.clientX - react.left
            const y = e.clientY - react.top;
            points.push(x, y)

            let div = document.createElement("div")
            div.style.left = `${x}px`
            div.style.top = `${y}px`
            div.setAttribute("class", "rounded-9999 w-15pt h-15pt shadow-sm absolute bg-white bg-op-60 border-3px border-solid border-sky")
            pointContainer.value?.appendChild(div)
        }
        count.value++
    }
}

watch(count, (val) => {
    if (val === $oauth.image.max) {
        $oauth.veriCaptcha(points).then((value) => {
            if (value.status === 0) {
                emits("captcha:error", false)
            } else {
                emits("captcha:error", true)
            }
        }, () => {
            emits("captcha:error", true)
        }).finally(() => {
            (pointContainer.value as HTMLElement).innerHTML = ""
            count.value = 0
            points = []
        })
    }
})
</script>