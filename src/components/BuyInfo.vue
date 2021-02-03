<!--购买信息组件-->
<template>
   <div id="app">
        <van-row class="col-2">
            <!-- 导航 -->
            <van-col span='24' class="title">
                <div class="back" style="background-color: green;">
                    <a href="javaScript:;" style="font-size: 35px;" 
						@click.prevent="search_shows">&lt;</a>
                </div>
                <span>{{ actives[2] }}</span>
            </van-col>
			<!-- 图片 -->
			<div class="preImg" @click="ImagePreviews()">
				<img v-lazy="buyImg" name="adapter" />
			</div>
        </van-row>

        <van-row class="col-3">
			<van-col span="24" class="lazy-bottom">
				<h4>￥509 <span>￥899</span> <div>5.7折</div></h4> 
			</van-col>
            <van-col span="24" class="lazy-left">
                <span>耐克Nike AIR ZOOM PEGASUS 34 男款跑鞋</span>
            </van-col>
            <hr/>
            <van-col class="empty"></van-col>
        </van-row>

        <!-- 优惠券单元格 -->
        <van-coupon-cell class="lists"
			:coupons="coupons"
			:chosen-coupon="chosenCoupon"
			@click="showList = true"/>

        <!-- 优惠券列表 -->
        <van-popup v-model="showList" position="bottom">
            <van-coupon-list
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                :disabled-coupons="disabledCoupons"
                @change="onChange"
                @exchange="onExchange"/>
        </van-popup>

        <order class="order" />

        <!-- 底部购买 -->
        <van-goods-action>
			<van-button size="mini" @click="onClickMiniBtn"><van-icon name="chat-o" size="30"/>客服</van-button>
			<van-button size="mini" @click="redirects('/shoppingCart')"><van-icon name="cart-o" size="30" info="5"/>购物车</van-button>
			<van-button type="warning" size="large" @click="onClickBigBtn">加入购物车</van-button>
			<van-button type="primary" size="large" @click="onClickBigBtn">立即购买</van-button>
        </van-goods-action>   
   </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { ImagePreview } from 'vant';
import { Toast } from 'vant';
import Order from './OrderList.vue';

// 优惠券
const coupon = {
	available: 1,
	discount: 0,
	denominations: 150,
	origin_condition: 0,
	reason: '',
	value: 150,
	name: '满498减100',
	start_at: 1489104000,
	end_at: 1514592000
};

export default {
  name: 'buyInfo',
  data() {
    return {
		preImgs:[],
		chosenCoupon: -1,
		coupons: [coupon],
		disabledCoupons: [coupon],
		showList:null,
		oShow:false,
    }
  },
  components:{
	Order,
  },
  computed: {
	...mapState({
		buyImg: state => state.home.buyInfo.img[0],
		actives: state => state.active.home.title,
		shop_info: state => state.home.shop_info,
		my_info: state => state.home.my_info,
		orderShow: state => state.home.orderShow,
	})
  },
  methods: {
    ...mapActions(['orderShows']),
	// 回退
    search_shows(){
         this.$router.back(-1);
    },
    // 商品预览
    ImagePreviews() {
        ImagePreview(this.preImgs);
    },
    // 优惠券
    onChange(index) {
		this.showList = false;
		this.chosenCoupon = index;
    },
    onExchange(code) {
		this.coupons.push(coupon);
    },
    onClickMiniBtn() {
		Toast('系统繁忙 请稍后再试');
    },
    onClickBigBtn() {
		this.orderShows();
    },
    onClickBigBtns() {
		this.orderShows();
    },
	// 页面重定向
	redirects(url) {
		this.$router.push(url)
	}
  },
  beforeCreate(){
	this.$http.get('/static/data.json').then((res)=>{
		const buy_id = this.$route.params.id;
		//获取商品信息
		if( res.status == 200 ) {
			const data = res.data.goods;
			const preImg = data.id_0.moreImg;
			this.preImgs = preImg;
		} 
	},(err)=>{
		this.imageList = this.src;
		this.broadcast = "暂无消息~~QAQ~"
	})
  },
}
</script>

<style lang="less" scoped>
   @import url('../assets/css/buyInfo.less');
</style>
