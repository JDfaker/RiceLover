new Vue({
    el:'#app-vue',
    data(){
        return {
            video_list:[],
            loading: false,
            user_input: '',
            video_source: 'all',
            video_date: ''
        }
    },
    methods:{
        GetUserInput(){
            alert(this.user_input)
            const article ={user_input: this.user_input, video_source: this.video_source, video_date: this.video_date}
            axios.post('http://localhost:8080',article)
            .then((response) => {
                this.video_list = response.data;
                window.location.href="./search.html";
                this.user_input = '';
            })
        },
        GetVideo(){
            this.loading = true;
            axios.get('http://localhost:8080')
            .then((response) => {
                this.video_list = response.data;
                this.loading = false;
            });
        },
        BiliBiliSource(){
            this.video_source = 'bilibili'
        },
        TiktokSouce(){
            this.video_source = 'tiktok'
        },
        YoutubeSouce(){
            this.video_source = 'youtube'
        },
        Allsource(){
            this.video_source = 'all'
        }
    }
})


