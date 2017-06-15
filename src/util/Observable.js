var Observable = function(generator){
    this._generator = generator;
};
Observable.prototype.subscribe = function(observer){
    this._generator.call(this,observer);
};
export default Observable;