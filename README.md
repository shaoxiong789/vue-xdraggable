# vue-draggable [![NPM version][npm-image]][npm-url] 

> 

## Installation

```sh
$ npm install --save vue-draggable
```

## Usage
* 支持模块化加载和浏览器中直接引入使用
```js
import draggable from 'vue-draggable/src/draggable.vue';
// OR
import draggable from 'vue-draggable';
Vue.use(draggable)
// OR
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script type="text/javascript" src="js/vue-draggable.js" ></script>
```

## Code Demo
```javascript
<template>
    <div>
        <p>只能水平拖动</p>
        <div class="box box-1" style="position: relative; overflow: hidden;">
            <draggable move="x" @dragstart="dragstart" @dragging="dragging" @dragend="dragend" style="position: absolute;top: 12%;left: 409px;cursor: move;">
                <dl>
                    <img src="./assest/img/01.jpg" width="150" height="150">
                </dl>
            </draggable>
        </div>
        <p>只能垂直拖动</p>
        <div class='box box-2' style="position: relative;">
            <draggable move="y" @dragstart="dragstart" @dragging="dragging" @dragend="dragend" style="position: absolute;left: 40%;cursor: move;">
                <dl ><img src="./assest/img/02.jpg" width=150 height=150></dl>
            </draggable>
        </div>
        <p>自由拖动，初始位置固定</p>
        <div class='box box-3' style="position: relative;">
            <draggable move="both" @dragstart="dragstart" @dragging="dragging" @dragend="dragend" style="position: absolute;cursor: move;">
                <dl><img src="./assest/img/03.jpg" width=150 height=150></dl>
                <!--<div handle style="height:100px;width:100px;background: #ccc;"></div>-->
            </draggable>
        </div>
        <p>自动拖动，初始位置随机</p>
        <div class='box box-4' style="position: relative;">
            <draggable :style="{'z-index':(focus==1)?1:0}" move="both" :randomPosition="true" @dragstart="focusing(1)" @dragging="dragging" @dragend="dragend" style="position: absolute;cursor: move;">
                <dl><img src="./assest/img/04.jpg" width=150 height=150></dl>
            </draggable>
            <draggable :style="{'z-index':(focus==2)?1:0}" move="both" :randomPosition="true" @dragstart="focusing(2)" @dragging="dragging" @dragend="dragend" style="position: absolute;cursor: move;">
                <dl><img src="./assest/img/05.jpg" width=150 height=150></dl>
            </draggable>
            <draggable :style="{'z-index':(focus==3)?1:0}" move="both" :randomPosition="true" @dragstart="focusing(3)" @dragging="dragging" @dragend="dragend" style="position: absolute;cursor: move;">
                <dl><img src="./assest/img/06.jpg" width=150 height=150></dl>
            </draggable>
            <draggable :style="{'z-index':(focus==4)?1:0}" move="both" :randomPosition="true" @dragstart="focusing(4)" @dragging="dragging" @dragend="dragend" style="position: absolute;cursor: move;">
                <dl><img src="./assest/img/07.jpg" width=150 height=150></dl>
            </draggable>
        </div>
        <p>自动拖动，初始位置随机，hander拖动</p>
        <div class='box box-5' style="position: relative;">
            <draggable :style="{'z-index':(focus==1)?1:0}" move="both" :randomPosition="true" @dragstart="focusing(1)" @dragging="dragging" @dragend="dragend" style="position: absolute;">
                <dl><i handle class='hander'>拖我</i><img src="./assest/img/04.jpg" width=150 height=150></dl>
            </draggable>
            <draggable :style="{'z-index':(focus==1)?1:0}" move="both" :randomPosition="true" @dragstart="focusing(1)" @dragging="dragging" @dragend="dragend" style="position: absolute;">
                <dl><i handle class='hander'>拖我</i><img src="./assest/img/05.jpg" width=150 height=150></dl>
            </draggable>
            <draggable :style="{'z-index':(focus==1)?1:0}" move="both" :randomPosition="true" @dragstart="focusing(1)" @dragging="dragging" @dragend="dragend" style="position: absolute;">
                <dl><i handle class='hander'>拖我</i><img src="./assest/img/06.jpg" width=150 height=150></dl>
            </draggable>
            <draggable :style="{'z-index':(focus==1)?1:0}" move="both" :randomPosition="true" @dragstart="focusing(1)" @dragging="dragging" @dragend="dragend" style="position: absolute;">
                <dl><i handle class='hander'>拖我</i><img src="./assest/img/07.jpg" width=150 height=150></dl>
            </draggable>
        </div>
    </div>
</template>
<script>
import Draggable from '../../src/draggable.vue';
export default {
    components: {
        Draggable
    },
    data() {
        return {
            focus: null
        };
    },
    methods: {
        dragstart(e) {
            window.console.log('开始拖动',e);
        },
        dragging(e) {
            window.console.log('拖动中',e);
        },
        dragend(e) {
            window.console.log('拖动结束',e);
        },
        focusing(num) {
            this.focus = num;
        }
        
    }
};
</script>
<style>
dl img{
    display: block;
}
.hander{
    cursor: move;
}
</style>
```

## License

MIT © [丁少雄](https://github.com/shaoxiong789)


[npm-image]: https://badge.fury.io/js/vue-drag.svg
[npm-url]: https://npmjs.org/package/vue-drag

