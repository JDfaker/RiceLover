new Vue({
    el:'#search_page',
    created: function(){
        this.GetVideo()
    },
    data(){
        return {
            video_list:[],
            loading: false,
            user_input: '',
            video_source: '$all'
        }
    },
    methods:{
        GetVideo(){
            this.loading = true;
            axios.get('http://localhost:8080')
            .then((response) => {
                this.video_list = response.data;
                this.loading = false;
            });
        },
        GetUserInput(){
            const article ={user_input: this.user_input, video_source: this.video_source}
            axios.post('http://localhost:8080',article)
            .then((response) => {
                this.video_list = response.data
                this.user_input = '';
            })
        }
    }
})