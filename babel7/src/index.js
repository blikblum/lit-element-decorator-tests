import {html, LitElement} from '@polymer/lit-element'

const isSpecDecorator = (args) => {
  return args.length === 1 && typeof args[0].kind === 'string'
}

// alternative way of creating the property
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
    // code extracted from https://github.com/Polymer/lit-element/issues/205#issuecomment-427719522
    const elementDescriptor = args[0]
    const name = elementDescriptor.key
    // key generation code copied from https://github.com/Polymer/lit-element/blob/master/src/lib/updating-element.ts
    const key = typeof name === 'symbol' ? Symbol() : `__${name}`
    return {
        // We are creating an own property and using the original initializer, but changing the key,
        // so foo becomes __foo. The getter and setter methods are created by createProperty().
        ...elementDescriptor,
        key,
        finisher(ctor) {
          ctor.createProperty(name, options)
        }
    }    
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