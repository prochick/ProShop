<template>
    <!-- 购物车组件 -->
    <div id="app">
        <!-- 顶部栏 -->
        <van-row gutter="20" class="row-1">
			<van-col span="3" class="cols">
				<a href="#" @click="redirects('/login')" v-show="!user_state">登录</a>
				<a href="#" @click="redirects('/me')" v-show="user_state">我的</a>
			</van-col>
			<van-col span="19" class="cols">
				<form action="/">
					<van-search class="search" style="background:white;height:35px;border-radius:22px;"
						@click.stop="search" placeholder="大家在搜索：一只小羊"/>
				</form>
			</van-col>
			<van-col span="2" class="cols">
				<van-icon name="qr" class="classfic"/>
			</van-col>
        </van-row>
		
		<!-- 商品展示 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="cartBox">
            <div v-for="(v, index) in shops" :key="index.id" class="shop-cart">
                <!-- 标签区域 -->
                <van-row class="shop-col">
                    <van-col span="10" class="check" offset="1">
                        <van-checkbox v-model="checked[index]">
                            {{shops[index]}} &nbsp;>
                        </van-checkbox>
                    </van-col>
                    <van-col span="4" offset="7">
                        <span class="edit" @click="showList=true">
                            领券&nbsp;|&nbsp;编辑  
                        </span>
                    </van-col>
                </van-row>
                <div @click="redirects('/goods/id_0/buy')">
                <van-card num="2"
                    :title="goodsTitle[index].slice(0,16)"
                    :desc="goodsDescription[0]"
                    :price="prices[index]"
                    :thumb="imageUrl[index]"/>
                </div>
            </div>
        </van-pull-refresh>   
        <!-- 优惠券列表 -->
        <van-popup v-model="showList" position="bottom">
            <van-coupon-list
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                :disabled-coupons="disabledCoupons"
                @change="onChange"
                @exchange="onExchange"/>
        </van-popup>
        
		<!-- 底部菜单栏 -->
		<van-tabbar v-model="tabarActive">
			<van-tabbar-item icon="wap-home" @click="redirects('/')">首页</van-tabbar-item>
			<van-tabbar-item icon="chat-o" :dot="community_info" @click="redirects('/community')">社区</van-tabbar-item>
			<van-tabbar-item icon="shopping-cart" :info="shop_info" @click="redirects('/shoppingCart')">购物车</van-tabbar-item>
			<van-tabbar-item icon="contact" :info="my_info" @click="redirects('/me')">我的</van-tabbar-item>
		</van-tabbar>
    </div>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    import { Toast } from 'vant';

    const coupon = {
        available: 1,
        discount: 0,
        denominations: 10000,
        origin_condition: 0,
        reason: '',
        value: 150,
        name: '满498减100',
        start_at: 1489104000,
        end_at: 1514592000
    };

    export default {
        name: 'shoppingCart',
        data() {
            return {
                tabarActive:2,
                imageList:[],
                broadcast:null,
                show:true,
                isLoading: false,
                checked: [false,false,false,false],
                chosenCoupon: -1,
                coupons: [coupon],
                disabledCoupons: [coupon],
                showList:null,
                imageUrl:[],
                goodsTitle:[],
                goodsDescription:[],
                prices:[],
                shops:[],
            }
        },
        computed: {
            ...mapState({
                src : state => state.home.lunbo.src,
				user_state: state => state.login.user_state,// 用户登录状态
                shop_info: state => state.home.shop_info,// 购物车信息
                my_info: state => state.home.my_info,// 我的信息
				community_info: state => state.community.community_info// 社区信息
            })
        },
        methods: {
            ...mapActions(['infoAction']),
			// 搜索
            search() {
                this.$router.push('/search');
            },
			// 刷新
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;
                    for (let i = 0; i < 3; i++) {
                        this.imageUrl.push(this.imageUrl[i]);
                        this.goodsTitle.push(this.goodsTitle[i]);
                        this.goodsDescription.push(this.goodsDescription[i]);
                        this.shops.push(this.shops[i]);
                        this.prices.push(this.prices[i]);
                    }

                    this.infoAction();
                    const infos = document.querySelector('.van-icon__info');
                    infos.innerText = this.shop_info;
                }, 500);
            },
            //优惠券
            onChange(index) {
                this.showList = false;
                this.chosenCoupon = index;
            },
            onExchange(code) {
                this.coupons.push(coupon);
            },
			// 页面重定向
            redirects(url) {
                this.$router.push(url);
            },
        },
        beforeCreate() {
            this.$http.get('/static/data.json').then((res)=>{
                if( res.status == 200 ) {
                    const data = res.data.goods;
                    const preImg = data.id_0.imgList[0];
                    const title = data.id_0.title[0];
                    const price = data.id_0.limit_price[0];
                    const description = data.id_0.description; 
                    const shops = data.id_0.shops;

                    this.imageUrl = preImg;
                    this.goodsTitle = title;
                    this.prices = price;
                    this.goodsDescription = description;
                    this.shops = shops;               
                } else {
                    this.imageList = this.src;
                    this.broadcast = "暂无消息!"
                }
            },
            (err)=>{
                this.imageList = this.src;
                this.broadcast = "暂无消息!"
            })
        }
    }
</script>

<style lang="less" scoped>
    @import url('../assets/css/home.less');
</style>