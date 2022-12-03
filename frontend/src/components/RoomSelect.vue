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
    v-on:click="getRoomList()">GetFreshBois</button>
<br>
<div v-for="room in roomListState.rooms.roomList">
	<a style="color: red;"  :href="('/room/'+room.roomNumber)" >Raum {{room.roomNumber}}: {{room.roomName}}<br></a>
	<div v-for="user in room.userList" style="margin-left: 20px;">
		<p>{{user.userName}}</p>
	</div>
</div>
</template>

<script setup lang="ts">
//v-on:click="swapRooms(room.roomNumber)"
import { useRoomBox } from '@/services/useRoomList';
import { onMounted } from 'vue';
import { useUser } from "@/services/useUser";
import { useRouter } from 'vue-router';

const { roomListState, getRoomList} = useRoomBox();
const { createUser } = useUser();

const router = useRouter();
onMounted(() => {
    createUser();
});
</script>
