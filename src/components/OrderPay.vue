<template>
    <!--订单提交页面-->
    <div id="app" style="background:white;margin-top:-20px;height:800px;">
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :search-result="searchResult"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
            class="address"
        />
        <van-submit-bar
            :price="50900*numO"
            button-text="提交订单"
            @submit="onSubmit"
        />
	</div>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    import { ImagePreview } from 'vant';
    import { Toast } from 'vant';

    export default {
        name: 'pay',
        data() {
            return {
                areaList:{
                    province_list: {
                        110000: '开封市',
                        120000: '郑州市'
                    },
                    city_list: {
                        110100: '开封市',
                        110200: '县',
                        120100: '郑州市',
                        120200: '县'
                    },
                    county_list: {
                        110101: '鼓楼区',
                        110102: '龙亭区',
                        110105: '顺河回族区',
                        110106: '禹王台区',
                        120101: '祥符区',
                        120102: '兰考县',
                        120103: '杞县',
                        120104: '尉氏县',
                        120105: '通许县',
                    }
                },
                searchResult: []
            }
        },
        computed: {
            ...mapState({
                buyImg: state => state.home.buyInfo.img[0],
                actives: state => state.active.home.title,
                shop_info: state => state.home.shop_info,
                my_info: state => state.home.my_info,
                orderShow: state => state.home.orderShow,
                numO: state => state.home.numO,
            }),
            ...mapGetters(['bc_notshow']),
        },
        methods: {
            ...mapActions(['orderShows']),
            onSubmit(e) {
                if(this.searchResult.length == 0) {
                    Toast('请填写收货信息');
                }else{
                    Toast('提交成功');
                    this.$router.push('/');
                }
            },
            search_shows(){
                this.$router.back(-1);
            },
            //商品预览
            ImagePreviews() {
                ImagePreview(this.preImgs);
            },
            //结算
            onSave() {
                Toast('save');
            },
            onDelete() {
                this.$router.back(-1)
            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [{
                    name: '河南大学金明校区',
                    address: '开封市龙亭区'
                    }];
                } 
                else {
                    this.searchResult = [];
                }
            }
        },
        beforeCreate() {
            this.$http.get('/static/data.json').then((res)=>{
                const buy_id = this.$route.params.id;
                //获取商品信息
                if( res.status == 200 ) {
                    const data = res.data.goods;
                    const preImg = data.id_0.moreImg;
                    this.preImgs = preImg;
                } 
            },
            (err)=>{
            this.imageList = this.src;
            this.broadcast = "暂无消息"
            })
        }
    }
</script>
<style lang="less" scoped>
    @import url('../assets/css/buyInfo.less');
</style>