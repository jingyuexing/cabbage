export interface CaptchaEvent {
  (e: 'captcha:error', value:boolean): void
}

export interface CaptchaProps {
  image:string
  thumb:string
}