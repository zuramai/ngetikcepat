import { useTypingStore } from "~/store/typing"

export const useTheme = () => {
    const typingStore = useTypingStore()

    const currentTheme = computed(() => typingStore.options.theme)
    const themeList = ref([])
    
    const changeTheme = (theme: string) => {
        console.log('theme changed to ', theme)
        typingStore.options.theme = theme
    }

    fetch("/themes/_list.json")
        .then(res => res.json())
        .then(res => {
            themeList.value = res  
        })
    

    return {
        currentTheme, 
        changeTheme,
        themeList
    }
}