<template>

<h1 style="font-size: 20px; text-align: center;"> ROOMS</h1>
<button style="background-color:#000000;
	border-radius:28px;
	border:1px solid #18ab29;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
	padding:16px 31px;
	text-decoration:none;
	text-shadow:0px 1px 0px #2f6627;
    "
    v-on:click="getRooms()">GetFreshBois</button>
<br>
<a style="color: red;" v-for="room in roomListState.rooms.roomList" href="#" v-on:click="swapRooms(room.roomNumber)">Raum {{room.roomNumber}}: {{room.roomName}}<br></a>
</template>

<script setup lang="ts">
import { useRoomBox } from '@/services/useRoomList';
import { onMounted } from 'vue';
import { useUser } from "@/services/useUser";

const { roomListState, getRoomList} = useRoomBox();
const { createUser } = useUser();

onMounted(() => {
    getRoomList();
    createUser();
});

function generateLink(roomNumber:number) : string {
    return '/rooms/'+roomNumber;
}

function getRooms() {
    getRoomList();
    roomListState.rooms.roomList.forEach(element => {
        console.log(element);
    });
}


function swapRooms(roomNumber : number) {
    fetch('/api/rooms/'+roomNumber, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sessionId: document.cookie.split("=")[1]})
        })
        .then((response) => {
            if (!response.ok) {
                console.log("Fehler bei Raumänderung!")
            }else {
                return response.text();
            }
        })
        .then((response: string|undefined) => {
            console.log("Fehler bei raumänderung!" + response);
        })
        .catch((e) => {
            console.log("Fehler bei Raumänderung! " + e)
        });
}
//:key="i.angebotid"
</script>