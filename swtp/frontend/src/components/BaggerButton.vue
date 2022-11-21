<template>
    <button @click="toggle()">Bagger</button>
</template>


<script setup lang="ts">
    import { computed, ref } from "vue";

    const status = ref(false);

    function toggle() {
        status.value = !status.value;
    }

</script>

