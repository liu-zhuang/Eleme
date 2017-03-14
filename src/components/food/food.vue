<template>
	<transition name="detail">
		<div class="foodDetailScroll-wrapper" ref="foodDetail" v-show="showDetail" >
			<div>
				<div class="back" @click="hideDetail">
					<i class="icon-arrow_lift"></i>
				</div>
				<div class="foodImg">
					<img :src="foodData.image" style="width:100%">
				</div>
				<div class="foodHead">
					<h1>{{foodData.name}}</h1>
					<div class="extra">
						<span>
							月售{{foodData.sellCount}}份
						</span>
						<span>
							好评率{{foodData.rating}}%
						</span>
					</div>
					<div class="price">
						<span class="new">
							{{foodData.price | filterCurrency}}
						</span>
						<span v-show="foodData.oldPrice" class="old">
							{{foodData.oldPrice | filterCurrency}}
						</span>
					</div>
					<div class="putshopcart" v-show="showPutCart" @click="putshopcart">加入购物车</div>
					<div class="cartctl-wrapper">
						<cartctl :food="foodData" v-show="!showPutCart" class="detail-cartctl"></cartctl>
					</div>
				</div>
				<split></split>
				<div class="foodDesc" v-show="foodData.info">
					<h2 class="title">商品介绍</h2>
					<div class="desc">{{foodData.info}}</div>
				</div>
				<split v-show="foodData.info"></split>
				<ratingselect ref="ratingselect" :ratings="foodData.ratings" :tabs-content="tabsContent" @refreshScroll="refreshScroll"></ratingselect>
			</div>
		</div>
	</transition>
</template>
<script>
	import BScroll from 'better-scroll';
	import cartctl from '../cartctl/cartctl';
	import split from '../split/split';
	import ratingselect from '../ratingselect/ratingselect';

	export default {
		props: ['foodData'],
		components: { BScroll, cartctl, split, ratingselect },
		data: function () {
			return {
				showDetail: false,
				tabsContent: [{type: 'all', name: '全部'},
				{type: '0', name: '推荐'},
				{type: '1', name: '吐槽'}]
			};
		},
		filters: {
			filterCurrency: function (val) {
				return '¥' + val;
			}
		},
		computed: {
			showPutCart: function () {
				if (this.foodData.cnt && this.foodData.cnt > 0) {
					return false;
				} else {
					return true;
				}
			}
		},
		watch: {
			foodData: function (val) {
				this.refreshScroll();
			}
		},
		methods: {
			showFoodDetail: function () {
				this.showDetail = true;
				this.$nextTick(() => {
					if (!this.foodDetailScroll) {
						this.foodDetailScroll = new BScroll(this.$refs.foodDetail, {
							click: true
						});
					} else {
						this.foodDetailScroll.refresh();
					}
				});
			},
			hideDetail: function () {
				this.showDetail = false;
				this.$refs.ratingselect.initData();
			},
			putshopcart: function () {
				if (this.foodData.cnt) {
					this.foodData.cnt ++;
				} else {
					this.$set(this.foodData, 'cnt', 1);
				}
			},
			refreshScroll: function () {
				this.$nextTick(() => {
					if (this.foodDetailScroll) {
						this.foodDetailScroll.refresh();
					} else {
						this.foodDetailScroll = new BScroll(this.$refs.foodDetail, {
							click: true
						});
					}
				});
			}
		}
	};
</script>
<style lang="less">
	.foodDetailScroll-wrapper{
		position: fixed;
		transform: translate3d(0, 0, 0);
		left: 0;
		top: 0;
		bottom:48px;
		z-index: 40;
		background-color: #fff;
		width:100%;
		.foodHead {
			margin: 18px;
			position: relative;
			height: 100px;
			h1 {
				font-size: 14px;
				font-weight: 700;
				color: rgb(7,17,27);
				line-height: 14px;
			}
			.extra {
				font-size: 10px;
				color: rgb(147,153,159);
				line-height: 10px;
				margin: 8px auto 18px 0;
			}
			.price {
				margin: 0 auto 18px 0;
				line-height: 24px;
				.new {
					font-size: 14px;
					font-weight: 700;
					color: rgb(240,20,20);
					margin-right:8px;
				}
				.old {
					font-size: 10px;
					font-weight: 700;
					color: rgb(147,153,159);
					text-decoration: line-through;
				}
			}
			.cartctl-wrapper {
				right: 18px;
				bottom: 0;
				display:inline-block;
				position: absolute;
				.detail-cartctl {
					font-size: 24px;
					color: rgb(0,160,220);
				}
			}
			.putshopcart {
				display: inline-block;
				width:74px;
				height:24px;
				border-radius: 12px;
				background-color: rgb(0,160,220);
				padding:6px 12px;
				font-size: 10px;
				color:rgb(255,255,255);
				line-height: 24px;
				position: absolute;
				right: 18px;
				bottom: 0;
				text-align: center;
			}
		}
		.foodDesc {
			margin: 18px;

			.title {
				font-size: 14px;
				color: rgb(7,17,27);
				line-height: 14px;
			}
			.desc {
				font-size: 12px;
				font-weight: 200;
				color: rgb(77,85,93);
				line-height: 24px;
			}
		}
		.foodRating {
			margin: 18px;
		}
	}
	.detail-enter-active, .detail-leave-active {
		transition: all 0.3s linear;
	}
	.detail-enter, .detail-leave-active {
		transform:translate3d(100%,0,0);
	}
	.back {
		position: absolute;
		left:12px;
		top:12px;
		color:#fff;
		font-size: 16px;
		padding:10px;
	}
</style>
