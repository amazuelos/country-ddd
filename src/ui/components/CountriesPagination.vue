<template>
  <div class="flex justify-center mt-6 gap-2">
    <button
      class="px-3 py-1 border rounded"
      :disabled="page <= 1"
      @click="page--"
    >
      Prev
    </button>

    <span>Page {{ page }} / {{ totalPages }}</span>

    <button
      class="px-3 py-1 border rounded"
      :disabled="page >= totalPages"
      @click="page++"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
const page = defineModel<number>('page')
defineProps<{
  totalPages: number
}>()
</script>
