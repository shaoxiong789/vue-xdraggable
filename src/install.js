import Draggable from './draggable.vue';
var state = false;

export default function (Vue) {
    if (state) return;
    state = true;
    Vue.component('draggable', Draggable);
}