var Observer = function(consumer){
    this._consumer = consumer;
};
Observer.prototype.onNotify = function(data){
    this._consumer.call(this,data);
};
export default Observer;