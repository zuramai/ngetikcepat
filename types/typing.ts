
export interface Word {
    text: string
    letters: {
        text: string 
        el: HTMLElement|null
    }[]
    el: HTMLElement|null
}