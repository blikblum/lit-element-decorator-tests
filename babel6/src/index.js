import {html, LitElement, property} from '@polymer/lit-element'


class MyApp extends LitElement {
  static properties = {
    count: {type: Number}
  }

  count = 0

  increment = () => {
    this.count++
  }

  render()  {
    return html`<h3>Decorator test</h3>
      <button @click=${this.increment}>Increment</button>
      <div>App value: ${this.count} (defined in properties static property)</div>
      <my-counter .value=${this.count}></my-counter>
    `
  }
}

class MyCounter extends LitElement {
  @property({type: Number})
  value = 0

  render()  {
    return html`<div>Component value: ${this.value} (defined in property decorator)</div>`
  }
}

customElements.define('my-app', MyApp)
customElements.define('my-counter', MyCounter)