<template>
    <div id="app">
        <van-row class="col-2">
            <van-col span="24" class="title">
                <a href="javaScipt:;" @click.prevent="search_shows">&lt;</a>
                <h4>{{ actives[1] }}</h4>
            </van-col>
        </van-row>
        <van-pull-refresh v-model="isLoading" @refrsh="onRefresh">
            <div class="over">
                <van-row v-for="(img,index) in imageList.img_1" :key='img.id' class="list">
                    <van-col span='11' offset="1" class="goods_list">
                        <div class="imgList" @click.stop="buy(img)">
                            <img v-lazy="img" name="adapter"/>
                        </div>
                        <van-col span="24" class="lazy-left">
                            <span>
                                {{title.title_1[index]}}
                            </span>
                        </van-col>
                        <van-col span="24" class="lazy-bottom">
                            <h4>
                                ￥{{limit_price.limit_p1[index]}} 
                                <span>
                                    ￥{{original_price.origin_p1[index]}} 
                                </span>
                                <div>
                                    {{discount.dis_1[index]}}
                                </div>
                            </h4>
                        </van-col>
                    </van-col>
                    <van-col span="11" offset="1" class="goods_list">
                        <div class="imgList" @click.stop="buy(imageList.img_2[index])">
							<img v-lazy="img" name="adapter"/>
                        </div>
                        <van-col span="24" class="lazy-left">
                            <span>
                                {{title.title_2[index]}}
                            </span>
                        </van-col>
                        <van-col span="24" class="lazy-bottom">
                            <h4>
                                ￥{{limit_price.limit_p2[index]}}
                                <span>
                                    ￥{{original_price.origin_p2[index]}}
                                </span>
                                <div>
                                    {{discount.dis_2[index]}}
                                </div>
                            </h4>
                        </van-col>
                    </van-col>
                </van-row>
            </div>
        </van-pull-refresh>
    </div>
</template>
<script>
    import{ mapState,mapActions,mapGetters} from 'vuex';
    import{ Toast } from 'vant';
    export default{
        name:'goodsInfo',
        data(){
            return {
                tabarActive:0,
                count: 0,
                isLoading: false,
                value:null,
                imageList:{
                    img_1:[],
                    img_2:[],
                },
                title:{
                    title_1:[],
                    title_2:[]
                },
                limit_price:{
                    limit_p1:[],
                    limit_p2:[],
                },
                original_price:{
                    origin_p1:[],
                    origin_p2:[],
                },
                discount:{
                    dis_1:[],
                    dis_2:[],
                },
                disabled:false,
			}
        },
        computed:{
            ...mapState({
                icon: state => state.home.badge.icon,
                bageTitle: state => state.home.badge.title,
                actives: state => state.active.home.title,
                src: state => state.home.lunbo.src,
            })
        },
        methods:{
			...mapActions(['buyParam']),
            search_shows(){
                this.$router.back(-1);
            },
            buy(img){
                this.buyParam(img);
                this.$router.push('/goods/id_0/buy');
            },
            onRefresh(){
                setTimeout(()=>{
                    Toast('刷新成功');
                    this.isLoading = false;
                    for(let i = 0; i < 4; i++){
                        this.imageList.img_1.push(this.imageList.img_1[i]);
                        this.imageList.img_2.push(this.imageList.img_2[i]);

                        this.title.title_1.push(this.title.title_1[i]);
                        this.title.title_2.push(this.title.title_2[i]);

                        this.limit_price.limit_p1.push( this.limit_price.limit_p1[i])
                        this.limit_price.limit_p2.push( this.limit_price.limit_p2[i])

                        this.original_price.origin_p1.push(this.original_price.origin_p1[i])
                        this.original_price.origin_p2.push(this.original_price.origin_p2[i])

                        this.discount.dis_1.push( this.discount.dis_1[i]);
                        this.discount.dis_2.push( this.discount.dis_2[i]);
                    }
                },500);
            },
        }, 
        beforeCreate(){
            this.$http.get('/static/data.json').then((res)=>{
                if(res.status == 200){
                    const data = res.data.goods;
                    switch(this.$route.params.id.toString()){
                        case 'id_0' :
                            this.title.title_1 = data.id_0.title[0];
                            this.title.title_2 = data.id_0.title[1];

                            this.imageList.img_1 = data.id_0.imgList[0];
                            this.imageList.img_2 = data.id_0.imgList[1];

                            this.limit_price.limit_p1 = data.id_0.limit_price[0];
                            this.limit_price.limit_p2 = data.id_0.limit_price[1];

                            this.original_price.origin_p1 = data.id_0.original_price[0];
                            this.original_price.origin_p2 = data.id_0.original_price[1];

                            this.discount.dis_1 = data.id_0.discount[0];
                            this.discount.dis_2 = data.id_0.discount[1];
                        
                            break;
                        case 'id_1' :
                            this.title.title_1 = data.id_1.title[0];
                            this.title.title_2 = data.id_1.title[1];

                            this.imageList.img_1 = data.id_1.imgList[0];
                            this.imageList.img_2 = data.id_1.imgList[1];

                            this.limit_price.limit_p1 = data.id_1.limit_price[0];
                            this.limit_price.limit_p2 = data.id_1.limit_price[1];

                            this.original_price.origin_p1 = data.id_1.original_price[0];
                            this.original_price.origin_p2 = data.id_1.original_price[1];

                            this.discount.dis_1 = data.id_1.discount[0];
                            this.discount.dis_2 = data.id_1.discount[1];
                        
                            break;
                        case 'id_2' :
                            this.title.title_1 = data.id_2.title[0];
                            this.title.title_2 = data.id_2.title[1];

                            this.imageList.img_1 = data.id_2.imgList[0];
                            this.imageList.img_2 = data.id_2.imgList[1];

                            this.limit_price.limit_p1 = data.id_2.limit_price[0];
                            this.limit_price.limit_p2 = data.id_2.limit_price[1];

                            this.original_price.origin_p1 = data.id_2.original_price[0];
                            this.original_price.origin_p2 = data.id_2.original_price[1];

                            this.discount.dis_1 = data.id_2.discount[0];
                            this.discount.dis_2 = data.id_2.discount[1];
                        
                            break;
                        case 'id_3' :
                            this.title.title_1 = data.id_3.title[0];
                            this.title.title_2 = data.id_3.title[1];

                            this.imageList.img_1 = data.id_3.imgList[0];
                            this.imageList.img_2 = data.id_3.imgList[1];

                            this.limit_price.limit_p1 = data.id_3.limit_price[0];
                            this.limit_price.limit_p2 = data.id_3.limit_price[1];

                            this.original_price.origin_p1 = data.id_3.original_price[0];
                            this.original_price.origin_p2 = data.id_3.original_price[1];

                            this.discount.dis_1 = data.id_4.discount[0];
                            this.discount.dis_2 = data.id_3.discount[1];
                        
                            break;
                        case 'id_4' :
                            this.title.title_1 = data.id_4.title[0];
                            this.title.title_2 = data.id_4.title[1];

                            this.imageList.img_1 = data.id_4.imgList[0];
                            this.imageList.img_2 = data.id_4.imgList[1];

                            this.limit_price.limit_p1 = data.id_4.limit_price[0];
                            this.limit_price.limit_p2 = data.id_4.limit_price[1];

                            this.original_price.origin_p1 = data.id_4.original_price[0];
                            this.original_price.origin_p2 = data.id_4.original_price[1];

                            this.discount.dis_1 = data.id_4.discount[0];
                            this.discount.dis_2 = data.id_4.discount[1];
                        
                            break;
                        case 'id_5' :
                            this.title.title_1 = data.id_5.title[0];
                            this.title.title_2 = data.id_5.title[1];

                            this.imageList.img_1 = data.id_5.imgList[0];
                            this.imageList.img_2 = data.id_5.imgList[1];

                            this.limit_price.limit_p1 = data.id_5.limit_price[0];
                            this.limit_price.limit_p2 = data.id_5.limit_price[1];

                            this.original_price.origin_p1 = data.id_5.original_price[0];
                            this.original_price.origin_p2 = data.id_5.original_price[1];

                            this.discount.dis_1 = data.id_5.discount[0];
                            this.discount.dis_2 = data.id_5.discount[1];
                        
                            break;
                        case 'id_6' :
                            this.title.title_1 = data.id_6.title[0];
                            this.title.title_2 = data.id_6.title[1];

                            this.imageList.img_1 = data.id_6.imgList[0];
                            this.imageList.img_2 = data.id_6.imgList[1];

                            this.limit_price.limit_p1 = data.id_6.limit_price[0];
                            this.limit_price.limit_p2 = data.id_6.limit_price[1];

                            this.original_price.origin_p1 = data.id_6.original_price[0];
                            this.original_price.origin_p2 = data.id_6.original_price[1];

                            this.discount.dis_1 = data.id_6.discount[0];
                            this.discount.dis_2 = data.id_6.discount[1];
                        
                            break;
                        default:
							break; 
                    }
                }
                else{
                    this.imageList = this.src;
                }(err)=>{
                    this.imageList = this.src;
                }
            })
        }
    }
</script>
<style lang="less" scoped>
    @import url('../assets/css/goods.less');
</style>