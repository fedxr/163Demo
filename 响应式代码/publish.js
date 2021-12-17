let eventEmitter = {
  // 缓存列表
  list:{},
  // 订阅方法
  on(event, fn) {
    let _this = this;
    _this.list[event] = fn;
    return _this;
  },
  // 取消方法
  off() {

  },
  // 只激活一次方法
  once() {

  },
  // 发布方法
  emit() {
    let _this = this;
    let fn = [].shift.call(arguments), context = [].shift.call(arguments);
    if(!_this.list[fn] || !context) return false;
    fn(context);
    return _this;
  }
};

eventEmitter.on('click', function(context) {
  console.log(context);
})

eventEmitter.emit('click', '执行');