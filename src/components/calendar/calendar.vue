<script lang="ts" setup>
import Title from "./calendarTitle.vue"
import Item from "./calendarItem.vue"
import Content from "./calendarContent.vue"
import { ACard, AInput } from "anu-vue"
import { ref,computed } from "vue"
interface CalendarData {
    year: number,
    month: number,
    day: number,
    isCurrentMonth: boolean,
}
const isActive = (item: CalendarData, date: Date) => {
    return [
        item.day === date.getDate(),
        item.month === date.getMonth(),
        item.year === date.getFullYear(),
        item.isCurrentMonth,
    ].every(Boolean)
}
const today = new Date()
const currentDate = ref({
    year:today.getFullYear(),
    month:today.getMonth() + 1,
    date:today.getDate()
})
const currentMonth = ref(currentDate.value.month)
const inputMonth = computed({
    get(){
        return currentMonth.value
    },
    set(val){
        let _month = currentMonth.value / 12
        currentDate.value.year += (~~_month)
        currentMonth.value = val % 13
    }
})
const iterDays = computed(()=>{
    return generateCalendar(new Date(currentDate.value.year,inputMonth.value - 1,currentDate.value.date))
})

const calendarGrid = 7 * 6
const isLeap = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 100 === 0
}
const getDays = (year: number, month: number) => {
    const feb = isLeap(year) ? 29 : 28
    const daysPerMonth = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysPerMonth[month];
}
const getNextOrLastMonthDays = (date: Date, type: "last" | "next") => {
    const month = date.getMonth()
    const year = date.getFullYear()
    if (type === "last") {
        const lastMonth = month === 0 ? 11 : month - 1
        const lastYear = lastMonth === 11 ? year - 1 : year
        return {
            year: lastYear,
            month: lastMonth,
            days: getDays(lastYear, lastMonth)
        }
    }
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = nextMonth === 0 ? year + 1 : year;
    return {
        year: nextYear,
        month: nextMonth,
        days: getDays(nextYear, nextMonth),
    };
}
let generateCalendar = (date: Date) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    // 当月天数
    const days = getDays(currentYear, currentMonth);
    // 获取上月末尾天数和下月开头的天数，用于填补当月日历空白
    const { days: lastMonthDays, year: lastMonthYear, month: lastMonth } = getNextOrLastMonthDays(date, 'last');
    const { year: nextMonthYear, month: nextMonth } = getNextOrLastMonthDays(date, 'next');
    // 1号是星期几
    const weekIndex = new Date(`${currentYear}/${currentMonth + 1}/1`).getDay();
    // 显示在当月末尾的下月天数
    const trailDays = calendarGrid - weekIndex - days;
    let trailVal = 0;
    const calendarTable: CalendarData[] = [];
    for (let i = 0; i < calendarGrid; i++) {
        // 补充上月天数
        if (i < weekIndex) {
            calendarTable[i] = {
                year: lastMonthYear,
                month: lastMonth,
                day: lastMonthDays - weekIndex + i + 1,
                isCurrentMonth: false,
            };
            // 补充下月天数
        } else if (i >= days + weekIndex) {
            if (trailVal < trailDays) {
                trailVal += 1;
            }
            calendarTable[i] = {
                year: nextMonthYear,
                month: nextMonth,
                day: trailVal,
                isCurrentMonth: false,
            };
        }
    }
    // 填充当月日期
    for (let d = 1; d <= days; d++) {
        calendarTable[weekIndex + d - 1] = {
            year: currentYear,
            month: currentMonth,
            day: d,
            isCurrentMonth: true,
        };
    }
    return calendarTable
};

</script>

<template>
    <ACard>
        <div class="a-card-body">
            <Title class="justify-end">
                <AInput class="text-sm col-start-1 -webkit-outer-spin-button:appearance-none" type="number" :placeholder="today.getFullYear()"  v-model="currentDate.year"/>
                <AInput class="text-sm col-start-1" type="number" :placeholder="today.getMonth()" v-model="inputMonth" />
            </Title>
            <div class="grid grid-cols-7 gap-1">
                <Item :value="item" :key="index" v-for="(item, index) in ['日', '一', '二', '三', '四', '五', '六']">
                    {{ item }}
                </Item>
            </div>
            <Content>
                <Item :value="[item.year, item.month, item.day].join('/')" v-for="(item) in iterDays"
                    :key="[item.year, item.month, item.day].join('/')"
                    :class="{ 'text-white bg-sky-300': isActive(item, today), 'text-gray-300': !item.isCurrentMonth,'text-amber-300':item.day === today.getDate() && !item.isCurrentMonth }"
                    @click="() => { }">
                    <span>
                        {{ item.day }}
                    </span>
                    <div class="absolute bottom-0 w-full flex justify-center items-center" v-if="false">
                        <span class="p-1 rounded-9999 bg-rose-300"></span>
                    </div>
                </Item>
            </Content>
        </div>
    </ACard>
</template>


<style>
    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button{
        -webkit-appearance: none;
    }
    input[type='number']{
        -moz-appearance: none;
    }
</style>