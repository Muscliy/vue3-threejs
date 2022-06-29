<template>
  <div ref="pageRef" class="page"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useThree2 } from "../demo/three-2";

const pageRef = ref();
useThree2(pageRef);
</script>
