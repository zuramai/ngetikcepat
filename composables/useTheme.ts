import { useConfigStore } from "~~/store/config"

type Theme = {
    name: string
}

export const useTheme = () => {
    const typingStore = useConfigStore()

    const currentTheme = computed(() => typingStore.options.theme)
    const themeList = ref<Theme[]>([])
    
    const changeTheme = (theme: string) => {
        console.log('theme changed to ', theme)
        typingStore.options.theme = theme
    }

    const nextTheme = () => {
        const index = themeList.value.findIndex(theme => theme.name == currentTheme.value)
        const nextIndex = index+1 >= themeList.value.length ? 0 : index + 1
        changeTheme(themeList.value[nextIndex].name)
    }

    onMounted(() => {
        fetch("/themes/_list.json")
            .then(res => res.json())
            .then(res => {
                themeList.value = res  
            })
    })
    

    return {
        currentTheme, 
        changeTheme,
        nextTheme,
        themeList
    }
}