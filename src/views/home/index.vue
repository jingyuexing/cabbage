<script setup lang="ts">
import { } from "vue"
import { Tabs, TabsList, TabsContent, TabsListItem } from "@components/tabs"
import { Calendar } from "@components/calendar"
</script>

<template>
    <div class="contenxt w-full">
        <Tabs default-value="account">
            <TabsList default-value="2">
                <TabsListItem value="1">1</TabsListItem>
                <TabsListItem value="2">2</TabsListItem>
                <TabsListItem value="3">3</TabsListItem>
            </TabsList>
            <TabsContent>

            </TabsContent>
        </Tabs>
        <Calendar/>
    </div>
</template>