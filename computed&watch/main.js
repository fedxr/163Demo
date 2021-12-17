let active;

let effect = (fn, options = {}) => {
  let effect = (...args) => {
    try {
      active = effect;
      return fn(...args);
    } finally {
      active = null;
    }
  }

  effect.options = options;
  effect.deps = [];
  return effect;
};

let cleanUpEffect = (effect) => {
  const {deps} = effect;

  if(deps.length) {
    for(let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
  }
};

let watchEffect = function (cb) {
  let runner = effect(cb);
  runner();

  return () => {
    cleanUpEffect(runner);
  }
};

let queue = [];
let nextTick = cb => {
  return Promise.resolve().then(cb);
};

let queueJob = dep => {
  if (!queue.includes(dep)) {
    queue.push(dep);
    nextTick(flushJobs);
  }
};

let flushJobs = () => {
  let job;
  while (queue.length > 0) {
    job = queue.shift();
    job && job();
  }
};

class Dep {
  deps = new Set();
  depend() {
    if (active) {
      this.deps.add(active);
      active.deps.push(this.deps);
    }
  };
  notify() {
    this.deps.forEach(dep => queueJob(dep));
    this.deps.forEach(dep => {
      dep.options && dep.options.schedular && dep.options.schedular();
    });
  };
};

let ref = (initValue) => {
  let dep = new Dep();

  return new Proxy({value: initValue},{
    get(target, prop) {
      dep.depend();
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      Reflect.set(target, prop, value);
      dep.notify();
    }
  });

  // return Object.defineProperty({}, 'value', {
  //   get() {
  //     dep.depend();
  //     return value;
  //   },
  //   set(newValue) {
  //     value = newValue;
  //     dep.notify();
  //   }
  // });
};

let computed = (fn) => {
  let value;
  let dirty = true;

  let runner = effect(fn, {
    schedular: () => {
      if (!dirty) dirty = true;
    }
  });

  return {
    get value() {
      if (dirty) {
        value = runner();
        dirty = false;
      }
      return value;
    }
  }
};

let watch = (source, cb, options = {}) => {
  const { immediate } = options;
  const getter = () => {
    return source();
  };

  let oldValue;
  const runner = effect(getter, {
    schedular: () => applyCb()
  });

  const applyCb = () => {
    let newValue = runner();
    if (newValue !== oldValue) {
      cb(newValue, oldValue);
      oldValue = newValue;
    }
  }

  if(immediate) {
    applyCb();
  } else {
    oldValue = runner();
  }

};

let count = ref(0);
let computedValue = computed(() => count.value + 3);

document.getElementById('add').addEventListener('click', () => {
  count.value++;
});

let str;
let stop = watchEffect(() => {
  str = `hello, ${count.value} ${computedValue.value}`;
  document.getElementById('app').innerText = str;
});

setTimeout(() => {
  stop();
}, 3000);

watch(
  () => count.value,
  (newValue, oldValue) => {
    console.log(newValue, oldValue);
  },
  { immediate: true }
);