export interface Config {
  /**
   * Activate punctuation in the generated words
   */
  punctuation: boolean

  /**
   * Use numbers in the generated words
   */
  numbers: boolean

  /**
   * Choose typing mode
   */
  mode: 'time' | 'words' | 'quote'

  /**
   * If user choose *time* mode, they can choose the duration in seconds
   */
  time: 15 | 30 | 45 | 60

  /**
   * If user choose *words* mode, they can choose the number of words that will be generated
   */
  words: 10 | 30 | 60 | 120

  /**
   * If user choose *quote* mode, they can choose the size of the quote
   */
  quote: 'all' | 'short' | 'medium' | 'long'
}
