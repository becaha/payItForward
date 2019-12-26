let indexVue = new Vue({
    el: '#indexVue',
    data: {
        lineSelected: false,
        circleASelected: false,
        circleSubSelected: false
    },
    methods: {
        setDefault() {
            this.lineSelected = false;
            this.circleASelected = false;
            this.circleSubSelected = false;
        },
        selectLines() {
            this.setDefault();
            this.lineSelected = true;
        },
        selectCircleA() {
            this.setDefault();  
            this.circleASelected = true;
        },
        selectCircleSub() {
            this.setDefault();
            this.circleSubSelected = true;
        }
    }
});