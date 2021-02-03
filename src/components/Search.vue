<template>
    <div id="sech">
		<!--搜索区-->
		<van-row gutter="20" class="row-1">
			<van-col span="3" class="cols">
				<a herf="javascript:;" @click="back" style="font-size: 20px;">&lt;</a>
			</van-col>
			<van-col span="17" class="cols">
				<form action="/">
					<van-search class="search" v-model="value" style="background:white;height:35px;border-radious:22px;"
						@focus="show = true" @blur="show = false" placeholder="大家都在搜索：一只小羊"/>
				</form>
			</van-col>
			<van-col span="2" class="cols">
				<a @click="ser" style="font-size: 15px;">搜索</a>
			</van-col>
		</van-row>

		<!---搜索区域-->
		<div class="prevshow">
			<!-- 搜索关键字展示 -->
			<div v-show="show">
				<van-row class="row-2">
					<van-col span="5">热门搜索：</van-col>
				</van-row>
				<van-row class="row-2 row-content">
					<van-col span="4" offset="2" class="bord">羽绒服</van-col>
					<van-col span="4" offset="1" class="bord">围巾</van-col>
					<van-col span="4" offset="1" class="bord">面膜</van-col>
					<van-col span="4" offset="1" class="bord">护肤</van-col>
				</van-row>
				<van-row class="row-2 row-content">
					<van-col span="4" offset="2" class="bord">耐克</van-col>
					<van-col span="4" offset="1" class="bord">大衣</van-col>
					<van-col span="4" offset="1" class="bord">女靴</van-col>
					<van-col span="4" offset="1" class="bord">口红</van-col>
				</van-row>
			</div> 
			<!-- 搜索商品展示 -->
			<div>
				<van-row  v-for="good in searchList" :key='good.id' class="lists">
					<van-col span='11' offset="1" class="goods_list">
						<div class="imgList">
							<img :src="good.picture" name="adapter" />
						</div>
						<van-col span="24" class="lazy-left">
							<span>{{ good.title }}</span>
						</van-col>
						<van-col span="24" class="lazy-bottom">
							<h4>￥{{ good.price }} <span>￥{{ good.price }}</span> <div>{{ '5' }}折</div></h4> 
						</van-col>
					</van-col>
					<van-col span='11' offset="1" class="goods_list">
						<div class="imgList">
							<img :src="good.picture" name="adapter"/>
						</div>
						<van-col span="24" class="lazy-left">
							<span>{{ good.title }}</span>
						</van-col>
						<van-col span="24" class="lazy-bottom">
							<h4>￥{{ good.price }} <span>￥{{ good.price }}</span> <div>{{ '5' }}折</div></h4> 
						</van-col>
					</van-col>
				</van-row>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState, mapActions, mapGetters} from 'vuex'

export default {
    name:'search',
    data(){
        return {
			value:'',// 搜索内容
			show: false,
		}
	},
	computed: {
		// 搜索结果
		...mapGetters(['searchList'])
	},	
	methods: {
		...mapActions(['searchGood']),
		// 搜索功能
		ser() {
			this.searchGood(this.value)
		},
		// 返回上个页面
		back(){
			this.$router.back(-1);
		},
		// 页面重定向
		redirects(url) {
			this.$router.push(url);
		}
	}
}

</script>

<style lang="less" scoped>
	@import url('../assets/css/search.less');
	@import url('../assets/css/goods.less');
</style>