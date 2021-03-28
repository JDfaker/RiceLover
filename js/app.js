new Vue({
    el:'#app-vue',
    data(){
        return {
            video_list:[],
            loading: false,
            user_input: '',
            video_source: 'all',
            video_from_date: '',
            video_to_date: '',
            least_like_count: '',
            least_view_count: '',
            sort_by: ''

        }
    },
    methods:{
        GetUserInput(){
            this.video_list = [];
            const article ={user_input: this.user_input, 
                            video_source: this.video_source, 
                            video_from_date: this.video_from_date, 
                            video_to_date: this.video_to_date,
                            least_like_count: this.least_like_count,
                            least_view_count: this.least_view_count,
                            sort_by: this.sort_by};
            
            axios.post('http://localhost:8080/',article)
            .then((response) => {
                this.video_list = response.data;
                this.user_input = '';
            })
        },
        GetVideo(){
            this.loading = true;
            axios.get('http://localhost:8080/')
            .then((response) => {
                this.video_list = response.data;
                this.loading = false;
            });
        }
    }
})


