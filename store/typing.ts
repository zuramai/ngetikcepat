interface WPMPerSecond {
    time: number 
    wpm: number 
}

export const useTypingStore = () => {
    const mistakes = ref(0)
    const wpm = ref(0)
    const currentWPM = ref(0)
    const wpmOverTime = reactive<WPMPerSecond[]>([])
    const accuracy = ref(0)
    const startRecordingTime = ref(0)
    const currentTime = ref(0)
    const time = ref(0)


    let recordingInterval: NodeJS.Timer
    let timerInterval: NodeJS.Timer

    const stopRecording = () => {
        clearInterval(timerInterval)
        clearInterval(recordingInterval)
    }

    const startRecording = () => {
        startRecordingTime.value = performance.now()

        let i = 0
        recordingInterval = setInterval(() => {
            wpmOverTime.push({
                time: i,
                wpm: wpm.value  
            })
            i++ 
            console.log(time.value)
        }, 1000)

        timerInterval = setInterval(() => {
            const currentTime = performance.now()
            const diff = currentTime - startRecordingTime.value    
            const centisecond = diff / 1000
            time.value = centisecond
        })
    }

    const getResult = () => {
        return {
            wpm,
            accuracy
        }
    }

    return {
        startRecording,
        stopRecording,
        getResult
    }
}