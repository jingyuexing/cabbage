export function useToggle<T extends unknown[] | boolean>(value:T) {
  let normalized = Array.isArray(value) ? value : [false, true];
  let index = 0;
  let toggleValue:T[number] | boolean = normalized[index]
  const toggle = () => {
    index = (index + 1) % normalized.length;
    toggleValue = normalized[index];
  };

  return {
    toggle,
    value:()=>toggleValue
  };
}


export function useCurry(cb: Function, ...args: unknown[]) {
  const curriedFn = (...newArgs: unknown[]) => {
    const allArgs = [...args, ...newArgs];
    if (allArgs.length >= cb.length) {
      return cb(...allArgs);
    } else {
      return useCurry(cb, ...allArgs);
    }
  };
  return curriedFn;
}

export function useQueue<T>(size:number){
  const _queue:T[] = []
  const _size = size
  const push = (ele:T)=>{
    _queue.push(ele)
    if(_queue.length > _size){
      _queue.shift()
    }
  }
  const items = (index:number)=>{
    if(index > (_size - 1) || index < 0){
      throw new Error("out of range")
    }
    return _queue[index]
  }
  return {
    push,
    items
  }
}