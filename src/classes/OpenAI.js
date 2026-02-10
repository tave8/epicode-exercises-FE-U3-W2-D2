class OpenAI {
  static apiUrl = `https://api.giuseppetavella.com/openai`

  constructor({ simplify = false }) {
    this.simplify = simplify
  }

  getFinalUrl(prompt) {
    return `${OpenAI.apiUrl}/?prompt=${prompt}&simplify=${this.simplify ? "1" : "0"}`
  }

  async ask(prompt) {
    const resp = await fetch(this.getFinalUrl(prompt))
    const data = await resp.json()
    return data
  }
}


export default OpenAI
