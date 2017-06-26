<template>
    <div>
        <slot ref="drag"></slot>
    </div>
</template>
<script>
export default {
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
    data() {
        return {
            left: null,
            top:  null,
            //元素到鼠标的距离
            pos:{
                x:null,
                y:null
            },
            //桌子的宽高
            desk:{
                width:null,
                height:null
            },
            //移动物体的宽高
            animal:{
                width:null,
                height:null
            },
            status: {
                dragging :false
            }
        };
    },
    watch: {
        left(val) {
            this.$el.style.left = val+'px';
        },
        top(val) {
            this.$el.style.top = val+'px';
        }
    },
    mounted() {
        //初始化桌子的宽高
        this.desk.width = this.$el.parentNode.clientWidth;
        this.desk.height = this.$el.parentNode.clientHeight;
        //初始化移动物的宽高
        this.animal.width = this.$el.clientWidth;
        this.animal.height = this.$el.clientHeight;
        var handle = this.$el.querySelector('[handle]')?this.$el.querySelector('[handle]'):this.$el;
        //初始化随机位置
        if(this.randomPosition){
            this.$el.style.left = Math.floor(Math.random()*(this.desk.width - this.animal.width))+'px';
            this.$el.style.top = Math.floor(Math.random()*(this.desk.height - this.animal.height))+'px';
        }
        this.left = this.$el.offsetLeft;
        this.top = this.$el.offsetTop;
        handle.addEventListener('mousedown',(e)=>{
            this.$emit('dragstart',e);
            this.status.dragging = true;
            this.pos.x = e.clientX - this.left;
            this.pos.y = e.clientY - this.top;
        });
        document.addEventListener('mousemove',this.mousemoveObserver);
        document.addEventListener('mouseup',this.mouseupObserver);
    },
    methods: {
        mousemoveObserver(e) {
            e.preventDefault();
            if(this.status.dragging==true){
                this.$emit('dragging',e);
                if(this.move == 'x' || this.move == 'both'){
                    var left = (e.clientX-this.pos.x)>0?(e.clientX-this.pos.x):0;
                    if(left>(this.desk.width-this.animal.width)){
                        left = this.desk.width-this.animal.width;
                    }
                    this.left = left;
                }
                if(this.move == 'y' || this.move == 'both'){
                    var top = (e.clientY-this.pos.y)>0?(e.clientY-this.pos.y):0;
                    if(top>(this.desk.height-this.animal.height)){
                        top = this.desk.height-this.animal.height;
                    }
                    this.top = top;
                }
            }
        },
        mouseupObserver(e) {
            if(this.status.dragging==true){
                this.$emit('dragend',e);
            }
            this.status.dragging = false;
        }
    },
    beforeDestroy() {
        document.removeEventListener('mousemove',this.mousemoveObserver);
        document.removeEventListener('mouseup',this.mouseupObserver);
    }
};
</script>
<style>

</style>

