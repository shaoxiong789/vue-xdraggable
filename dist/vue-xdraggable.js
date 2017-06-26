(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueXdraggable = factory());
}(this, (function () { 'use strict';

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
        document.addEventListener('mousemove', this.mousemoveObserver);
        document.addEventListener('mouseup', this.mouseupObserver);
    },

    methods: {
        mousemoveObserver: function mousemoveObserver(e) {
            e.preventDefault();
            if (this.status.dragging == true) {
                this.$emit('dragging', e);
                if (this.move == 'x' || this.move == 'both') {
                    var left = e.clientX - this.pos.x > 0 ? e.clientX - this.pos.x : 0;
                    if (left > this.desk.width - this.animal.width) {
                        left = this.desk.width - this.animal.width;
                    }
                    this.left = left;
                }
                if (this.move == 'y' || this.move == 'both') {
                    var top = e.clientY - this.pos.y > 0 ? e.clientY - this.pos.y : 0;
                    if (top > this.desk.height - this.animal.height) {
                        top = this.desk.height - this.animal.height;
                    }
                    this.top = top;
                }
            }
        },
        mouseupObserver: function mouseupObserver(e) {
            if (this.status.dragging == true) {
                this.$emit('dragend', e);
            }
            this.status.dragging = false;
        }
    },
    beforeDestroy: function beforeDestroy() {
        document.removeEventListener('mousemove', this.mousemoveObserver);
        document.removeEventListener('mouseup', this.mouseupObserver);
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
