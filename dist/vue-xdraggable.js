(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueXdraggable = factory());
}(this, (function () { 'use strict';

var Observer = function Observer(consumer) {
    this._consumer = consumer;
};
Observer.prototype.onNotify = function (data) {
    this._consumer.call(this, data);
};

var Observable = function Observable(generator) {
    this._generator = generator;
};
Observable.prototype.subscribe = function (observer) {
    this._generator.call(this, observer);
};

//利用观察者模式和闭包的特性使事件只绑定一次，从而优化性能
var mouseup = new Observable(function () {
    var observers = [];
    document.addEventListener('mouseup', function (e) {
        observers.forEach(function (observer) {
            observer.onNotify(e);
        });
    });
    return function (observer) {
        observers.push(observer);
    };
}());
var mousemove = new Observable(function () {
    var observers = [];
    document.addEventListener('mousemove', function (e) {
        observers.forEach(function (observer) {
            observer.onNotify(e);
        });
    });
    return function (observer) {
        observers.push(observer);
    };
}());
var Xdraggable = {
    render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', [_vm._t("default")], 2);
    },
    staticRenderFns: [],
    props: {
        move: {
            type: String,
            default: 'both'
        },
        randomPosition: {
            type: Boolean,
            default: false
        }
    },
    data: function data() {
        return {
            left: null,
            top: null,
            //元素到鼠标的距离
            pos: {
                x: null,
                y: null
            },
            //桌子的宽高
            desk: {
                width: null,
                height: null
            },
            //移动物体的宽高
            animal: {
                width: null,
                height: null
            },
            status: {
                dragging: false
            }
        };
    },

    watch: {
        left: function left(val) {
            this.$el.style.left = val + 'px';
        },
        top: function top(val) {
            this.$el.style.top = val + 'px';
        }
    },
    mounted: function mounted() {
        var _this = this;

        //初始化桌子的宽高
        this.desk.width = this.$el.parentNode.clientWidth;
        this.desk.height = this.$el.parentNode.clientHeight;
        //初始化移动物的宽高
        this.animal.width = this.$el.clientWidth;
        this.animal.height = this.$el.clientHeight;
        var handle = this.$el.querySelector('[handle]') ? this.$el.querySelector('[handle]') : this.$el;
        //初始化随机位置
        if (this.randomPosition) {
            this.$el.style.left = Math.floor(Math.random() * (this.desk.width - this.animal.width)) + 'px';
            this.$el.style.top = Math.floor(Math.random() * (this.desk.height - this.animal.height)) + 'px';
        }
        this.left = this.$el.offsetLeft;
        this.top = this.$el.offsetTop;
        handle.addEventListener('mousedown', function (e) {
            _this.$emit('dragstart', e);
            _this.status.dragging = true;
            _this.pos.x = e.clientX - _this.left;
            _this.pos.y = e.clientY - _this.top;
        });
        mousemove.subscribe(new Observer(function (e) {
            e.preventDefault();
            if (_this.status.dragging == true) {
                _this.$emit('dragging', e);
                if (_this.move == 'x' || _this.move == 'both') {
                    var left = e.clientX - _this.pos.x > 0 ? e.clientX - _this.pos.x : 0;
                    if (left > _this.desk.width - _this.animal.width) {
                        left = _this.desk.width - _this.animal.width;
                    }
                    _this.left = left;
                }
                if (_this.move == 'y' || _this.move == 'both') {
                    var top = e.clientY - _this.pos.y > 0 ? e.clientY - _this.pos.y : 0;
                    if (top > _this.desk.height - _this.animal.height) {
                        top = _this.desk.height - _this.animal.height;
                    }
                    _this.top = top;
                }
            }
        }));
        mouseup.subscribe(new Observer(function (e) {
            if (_this.status.dragging == true) {
                _this.$emit('dragend', e);
            }
            _this.status.dragging = false;
        }));
    }
};

var state = false;

var install$1 = function (Vue) {
    if (state) return;
    state = true;
    Vue.component('xdraggable', Xdraggable);
};

if (typeof window !== 'undefined' && window.Vue) {
    install$1(window.Vue);
}

return install$1;

})));
//# sourceMappingURL=vue-xdraggable.js.map
