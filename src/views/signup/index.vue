<template>
    <main class="flex w-full h-100vh">
        <div
            class="h-full w-[30%] bg-gradient overflow-hidden bg-sky-300 items-center dark:bg-stone-300 hidden md:flex md:flex-col">
            <!-- <Photo src="/cabbage.svg" class="w-60pt h-60pt mt-3 rounded-99999"/> -->
        </div>
        <div class="h-full flex justify-center w-full bg-white items-center flex-1">
            <div class="signup flex flex-col gap-3 w-68% sm:w-50% md:w-45% lg:w-35%">
                <div class="w-full flex justify-around items-center">
                    <Photo src="/cabbage.svg" class="w-30pt h-30pt" />
                    <ATypography :title="['Welcome to the Cabbage!', 'font-bold text-[1.25rem]']" />
                </div>
                <div class="validate-input">
                    <AInput v-model="email" type="email" placeholder="email" :error="emailError" label="email" />
                    <AInput v-model="password" label="password" type="password" placeholder="password"
                        :error="passwordError" />
                </div>
                <div class="submit flex justify-around items-center gap-1">
                    <ABtn variant="light" class="select-none" @click="loginhandler">Login</ABtn>
                    <ABtn variant="light" class="select-none" @click="signuphandler">Signup</ABtn>
                </div>
            </div>
        </div>
        <ADialog persistent v-model="isDialogShown" class="w-fit p-2">
            <Captcha @captcha:error="handlerCaptchaError" />
        </ADialog>
        <ADialog v-model="showInformation">
            <AAlert color="warning" v-if="showInformation">
                {{ message }}
            </AAlert>
        </ADialog>
    </main>
</template>

<script lang="ts" setup>
import { AInput, ATypography, ABtn, ADialog, AAlert } from "anu-vue"
import { ref, watch, computed, Ref } from "vue"
import z from "zod"
import { useField, useForm } from "vee-validate"
import { Photo } from "@components/Photo"
import { Captcha } from "@components/captcha"
import { toTypedSchema } from "@vee-validate/zod"
import { OauthStore } from "@/store/oauth"

// value
let isDialogShown = ref(false)
const actionType = ref<"login" | "signup">("signup")
const showInformation = ref(false)
const message = ref("")
// validate schema
const validationSchema = toTypedSchema(
    z.object({
        email: z.string().nonempty("this is require").min(6).max(100).email(),
        password: z.string().nonempty("this is require").min(12).max(100)
    })
)
const form = useForm({
    validationSchema,
});

const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');

const FormData = computed(() => ({ email: (email as Ref<string>).value, password: (password as Ref<string>).value }))

// store
const oauth = OauthStore()

// handler

const handlerCaptchaError = (val: boolean) => {
    if (val) {
        // has error
        oauth.getCaptcha()
    } else {
        isDialogShown.value = false
        if (form.meta.value.valid) {
            if (actionType.value === "signup") {
                oauth.register(FormData.value.email, FormData.value.password).then((value) => {
                    showInformation.value = true
                    if (value.status !== 0) {
                        message.value = value.message
                    } else {
                        message.value = "注册完成"
                    }
                }, (reject) => {
                    console.log(reject)
                })
            } else {
                oauth.login(FormData.value.email, FormData.value.password).then((value) => {
                    showInformation.value = true
                    if (value.status !== 0) {
                        message.value = value.message
                    } else {
                        message.value = "登录完成"
                    }
                }, (reject) => {
                    console.log(reject)
                })

            }
        }

    }
}
// signup handler
const signuphandler = () => {
    actionType.value = "signup"
    // 
    if (!(password.value && email.value)) {
        showInformation.value = true
        message.value = "邮箱和密码为必填项";
        return
    }
    isDialogShown.value = !isDialogShown.value
}
// login handler
const loginhandler = () => {
    actionType.value = "login"
    // 
    if (form.meta.value.valid) {
        showInformation.value = true
        message.value = "邮箱和密码为必填项";
        return
    }
    isDialogShown.value = !isDialogShown.value
}


</script>

<style>
.bg-gradient {
    background: rgb(110, 194, 226);
    background: linear-gradient(45deg, #00C9FF 0%, rgb(49 222 162) 100%);
}
</style>