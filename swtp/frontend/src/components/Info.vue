<template>
    <h2>Infofenster</h2>

    <button v-on:click="createUser">test</button>
    Name <input type="text" v-model="name">
</template>

<script setup lang="ts">
import { useRoom } from "@/services/useRoom";
import { onMounted, ref } from "vue";
import {User , type IUser} from "@/services/IUser";
import { useUser } from "@/services/useUser";
 

let name = ref("");

const {room, receiveRoom} = useRoom();
const {sendUser} = useUser();
onMounted(()=>{
    receiveRoom();
})

function createUser(){
    if (document.cookie.split("=")[0] != 'sid') {
        document.cookie = "sid="+crypto.randomUUID();
        const user = new User(document.cookie.split("=")[1], 1, name.value);
        sendUser(user);
    }
}

</script>