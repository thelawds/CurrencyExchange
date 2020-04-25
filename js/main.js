window.addEventListener('load', () => {

    table = new Vue({
        el: '.main',
        data: {
            currencies: null,
            date: '',
            base: 'EUR',
            styleClassesAvailable: ['table-striped', 'table-dark', 'table-bordered', 'table-hover'],
            styleClassesApplied: [],
            sucDate: 'success',
            enabledButton: true,
            filter: ''
        },
        methods: {
            getData(){
                axios.get('https://api.exchangeratesapi.io/' + this.date + '?base=' + this.base)
                    .then(response => (this.currencies = response.data.rates));
            },
            checkDate(){
                if (Number(this.date.split('-')[0]) < 1999){
                    this.sucDate = 'failure';
                    this.enabledButton = false;
                }
                else{
                    this.sucDate = 'success';
                    this.enabledButton = true;
                }

            },
            styleClassName(styleClass){
                let ans = styleClass.split('-').join(' ');
                if (styleClass === 'table-hover')
                    ans += "able";

                return "Make " + ans;
            }
        },
        computed: {
            dataFilter(){
                return this.filter === '' ? '' : this.filter.toUpperCase();
            }
        },
        beforeMount(){
            this.date = new Date().toJSON().slice(0, 10);
            this.getData();
        }
    });

})