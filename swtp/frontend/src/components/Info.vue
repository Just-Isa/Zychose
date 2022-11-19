<template>
    <button v-on:click="createUser">test</button>
    Name <input type="text" v-model="name">
</template>

<script setup lang="ts">
import { useRoom } from "@/services/useRoom";
import { onMounted, ref, VueElement } from "vue";
import {User , type IUser} from "@/services/IUser";
import { useUser } from "@/services/useUser";
import $, { event } from 'jquery';
import { Mouse } from "@/services/IMouse";

// https://vueuse.org/core/usemouse/
import { useMouse } from '@vueuse/core';
 

const {x, y} = useMouse({touch: false});
let name = ref("");

let lastXsent = 0;
let lastYsent = 0;
let lastTimeSent = Date.now();

const {roomState, receiveRoom} = useRoom();
const {sendMouse, mouseState, receiveMouse} = useUser();
const {sendUser} = useUser();

onMounted(()=>{
    receiveRoom();
    receiveMouse();
})

function createUser(){
    if (document.cookie.split("=")[0] != 'sid') {
        document.cookie = "sid="+crypto.randomUUID();
        const user = new User(document.cookie.split("=")[1], 1, name.value);
        sendUser(user);
    }
}

setInterval(function() 
    {
        if ((Math.abs(lastXsent-x.value) > 20) && (Math.abs(lastYsent-y.value) > 20)) 
        {
            lastXsent = x.value;
            lastYsent = y.value;
            sendMouse(new Mouse(document.cookie.split("=")[1], roomState.room.roomNumber, x.value, y.value));
            lastTimeSent = Date.now();
        }       
    }
, 200);



</script>