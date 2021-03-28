new Vue({
    el:'#app-vue',
    data(){
        return {
            video_list:[],
            loading: false,
            user_input: 'apple',
            video_source: 'all',
            video_from_date: '2000-1-1',
            video_to_date: '2021-1-1',
            least_like_count: '0',
            least_view_count: '0',
            sort_by: 'likeCount',

            number_of_show: 1
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
            //junmp to id result_point
            document.querySelector("#result_point").scrollIntoView(true);
        },
        AddShowNumber(){
            this.number_of_show = this.number_of_show + 2
        }
    }
})


