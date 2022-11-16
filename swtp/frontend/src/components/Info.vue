<template>
    <h2>Infofenster</h2>

    <button v-on:click="createUser">test</button>
</template>

<script setup lang="ts">
import { useRoom } from "@/services/useRoom";
import { onMounted } from "vue";
import {User , type IUser} from "@/services/IUser";
import { useUser } from "@/services/useUser";
 
const {room, receiveRoom} = useRoom();
const {sendUser} = useUser();
onMounted(()=>{
    receiveRoom();
})

function createUser(){
    const user = new User("1234", 0, "peter");
    sendUser(user);
}
</script>