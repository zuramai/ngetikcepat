export const useTimer = () => {
  const currentTime = ref(0)
  const startTime = ref(0)
  const timeElapsed = ref('00:00')
  const isStarted = ref(false)
  let interval = null

  const reset = () => {
    isStarted.value = false
    const timeElapsed = ref(0)
    currentTime.value = 0
  }

  const start = () => {
    startTime.value = performance.now()
    interval = setInterval(() => {
      currentTime.value = performance.now()

      const diff = currentTime.value - startTime.value
      timeElapsed.value = `${diff / 1000}`
    }, 10)
  }

  return {
    currentTime,
    timeElapsed,
    start,
    reset,
  }
}
