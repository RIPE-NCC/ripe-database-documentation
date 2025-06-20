import { ref } from 'vue'

const isScreenOpen = ref(false)

export function useNav() {
  function openScreen() {
    isScreenOpen.value = true
  }

  function closeScreen() {
    isScreenOpen.value = false
  }

  function toggleScreen() {
    isScreenOpen.value = !isScreenOpen.value
  }

  return {
    isScreenOpen,
    openScreen,
    closeScreen,
    toggleScreen
  }
}