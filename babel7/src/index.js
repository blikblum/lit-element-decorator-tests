import {html, LitElement} from '@polymer/lit-element'

const isSpecDecorator = (args) => {
  return args.length === 1 && typeof args[0].kind === 'string'  
}

function createSpecElementDescriptor({kind, key, placement, descriptor, initializer}, options) {    
  const valueKey = typeof key === 'symbol' ? Symbol() : `__${key}`;
  let underlyingDescriptor = { enumerable: false, configurable: false, writable: true };
  let underlying = { kind, key: valueKey, placement, descriptor: underlyingDescriptor, initializer };
  return {
    kind: "method",
    key,
    placement,
    descriptor: {
      get() { return this[valueKey]; },
      set(value) {
        const oldValue = this[valueKey];        
        this[valueKey] = value;
        this._requestPropertyUpdate(name, oldValue, options);
      },
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    },
    extras: [underlying]
  };
}

const property = (options) => (...args) => {
  if (isSpecDecorator(args)) {    
    return createSpecElementDescriptor(args[0], options)
  } else {
    const proto = args[0]
    const name = args[1]
    proto.constructor.createProperty(name, options);
  }  
};


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
      <div>App value: ${this.count}</div>
      <my-counter .value=${this.count}></my-counter>
    `
  }
}

class MyCounter extends LitElement {
  @property({type: Number})
  value = 0

  render()  {
    return html`<div>Component value: ${this.value}</div>`
  }
}

customElements.define('my-app', MyApp)
customElements.define('my-counter', MyCounter)