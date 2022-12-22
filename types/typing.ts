export interface Word {
  text: string
  letters: {
    text: string
    el: HTMLElement | null
  }[]

  /**
     * Div of the word containing the letters
     */
  el: HTMLElement | null

  /**
     * The row number that the word is rendered in the typing area
     */
  row?: number
}
