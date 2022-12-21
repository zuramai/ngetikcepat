export default function(timer: ReturnType<typeof useTimer>) {
  const calculateWpm = (correctly) => {

    return computed(() => {
      timer.currentTime.value
      // total amount of characters in the correctly typed words (including spaces), divided by 5 and normalised to 60 seconds
    })
  } 
  
  const startTyping = () => {

  }

  return {
    calculateWpm,
    startTyping
  }
}