import Xdraggable from './xdraggable.vue';
var state = false;

export default function (Vue) {
    if (state) return;
    state = true;
    Vue.component('xdraggable', Xdraggable);
}