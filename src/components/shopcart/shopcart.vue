<template>
	<div class="shopcart">
		<div class="cartWrapper">
			<div class="content-left" @click="toggleCartList">
				<div class="cartImg">
					<div class="imgWrapper"  :class="{highlight:cartCnt>0}">
						<i class="icon-shopping_cart"></i>
					</div>
					<div v-show="cartCnt>0" class="cart-cnt">
						{{cartCnt}}
					</div>
				</div>
				<div class="cartTotal" :class="{highlight:cartCnt>0}">
					{{totalPrice | currency}}
				</div>
				<div class="dileveryDesc">
					另需配送费{{deliveryPrice | currency | unit}}
				</div>
			</div>
			<div class="content-rigth" @click="calcCart" :class="{highlight:leftPrice<=0}">{{cartDesc}}</div>
		</div>
		<transition name="fold">
			<div class="cartList" v-show="listShow">
				<div class="header">
					<h2 class="title">购物车</h2>
					<div class="space"></div>
					<span class="clearCart" @click="clearCart">清空</span>
				</div>
				<div class="content-wrapper" ref="listContent">
					<ul  >
						<li v-for="food in selectedFood" class="food">
							{{food.name}}
							<span class="foodprice">{{food.price*food.cnt | currency}}</span>
							<div class="cartctl-wrapper">
								<cartctl class="cartctl" :food="food"></cartctl>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<div class="listmask" v-show="listShow" @click="fold=true"></div>
	</div>
</template>
<script>
	import cartctl from '../cartctl/cartctl';
	import BScroll from 'better-scroll';
	export default {
		// props: ['minPrice', 'deliveryPrice', 'selectedFood'],
		props: {
			minPrice: {
				type: Number
			},
			deliveryPrice: {
				type: Number
			},
			selectedFood: {
				type: Array,
				defautl: []
			}
		},
		components: {cartctl},
		data: function () {
			return {
				leftPrice: this.minPrice,
				fold: true
			};
		},
		filters: {
			currency: function (val) {
				return '￥' + val;
			},
			unit: function (val) {
				return val + '元';
			}
		},
		computed: {
			totalPrice: function () {
				var ret = 0;
				this.selectedFood.forEach(food => {
					ret += food.price * food.cnt;
				});
				return ret;
			},
			cartCnt: function () {
				let ret = 0;
				this.selectedFood.forEach(food => {
					ret += food.cnt;
				});
				return ret;
			},
			cartDesc: function () {
				let ret = this.minPrice + '元起送';
				let calcPrice = this.minPrice - this.totalPrice;
				if (calcPrice > 0) {
					ret = '还差' + calcPrice + '元';
				} else {
					ret = '结算';
				}
				this.leftPrice = calcPrice;
				return ret;
			},
			listShow: function () {
				if (this.totalPrice === 0) {
					this.fold = true;
					return false;
				}
				return !this.fold;
			}
		},
		methods: {
			dropBall: function (el) {
				// todo: 小球抛下动画
				console.log('dropball...');
			},
			toggleCartList: function () {
				if (this.totalPrice === 0) {
					return;
				}
				this.fold = !this.fold;
				this.$nextTick(() => {
					if (!this.listScroll) {
						this.listScroll = new BScroll(this.$refs.listContent, {
							click: true
						});
					} else {
						this.listScroll.refresh();
					}
				});
			},
			clearCart: function () {
				this.selectedFood.forEach(food => {
					food.cnt = 0;
				});
			},
			calcCart: function () {
				if (this.totalPrice > this.minPrice) {
					alert('需支付' + this.totalPrice + '元');
				}
			}
		}
	};
</script>
<style lang="less">
	.shopcart {
		height: 48px;
		background: #141d27;
		position: fixed;
		bottom:0;
		left:0;
		width:100%;
		z-index: 50;
		.cartWrapper {
			display: flex;
			.content-left {
				flex: 1;
				font-size: 0;
				z-index: 45;
				.cartImg {
					display: inline-block;
					vertical-align: top;
					margin: 0 6px;
					padding:6px;
					position: relative;
					top: -10px;
					border-radius: 50%;
					background: rgb(15,22,29);
					width:56px;
					height:56px;
					text-align: center;
					box-sizing: border-box;
					.imgWrapper {
						position: relative;
						width:44px;
						height: 44px;
						border-radius: 50%;
						background: rgb(32,39,46);
						line-height: 44px;
						font-size: 18px;
						color:rgba(255,255,255,0.4);
						.icon-shopping_cart {
						}
						&.highlight {
							background-color: rgb(0,160,220);
							color:rgb(255,255,255);
						}
					}
					.cart-cnt {
						position: absolute;
						top:0;
						right: 0;
						width:24px;
						height: 16px;
						font-size:9px;
						font-weight: 700;
						line-height: 16px;
						color:rgb(255,255,255);
						background: rgb(240,20,20);
						border-radius: 16px;
						box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
					}
				}
				.cartTotal {
					display: inline-block;
					vertical-align: top;
					font-size: 14px;
					color: rgba(255,255,255,0.4);
					border-right: solid 1px rgba(255,255,255,0.1);
					font-weight: 700;
					line-height: 24px;
					margin-top: 12px;
					padding-right:12px;
					&.highlight {
						color:rgb(255,255,255);
					}
				}
				.dileveryDesc {
					display: inline-block;
					vertical-align: top;
					font-size: 12px;
					color:rgba(255,255,255,0.4);
					margin-top: 12px;
					margin-left:6px;
					line-height: 24px;
				}
			}
			.content-rigth {
				flex: 0 0 85px;
				width:85px;
				text-align: center;
				font-size: 12px;
				color:rgba(255,255,255,0.4);
				font-weight: 700;
				line-height: 56px;
				height: 56px;
				background: rgb(32,38,45);
				z-index: 45;
				&.highlight {
					background-color: rgb(69,209,79);
					color:rgb(255,255,255);
				}
			}
		}
		.cartList {
			width:100%;
			position: absolute;
			left:0;
			top:0;
			z-index: 40;
			transform: translate3d(0,-100%,0);
			.header {
				height:40px;
				width:100%;
				background-color: #f3f5f7;
				border-bottom: 2px solid rgba(7,17,27,0.1);
				display: flex;
				.title {
					font-size: 14px;
					font-weight: 200;
					color:rgb(7,17,27);
					line-height: 40px;
					margin-left: 18px;
				}
				.space {
					flex:1;
				}
				.clearCart {
					font-size: 14px;
					color: rgb(0,160,220);
					line-height: 40px;
					align-self: flex-end;
					margin-right: 18px;
				}				
			}
			.content-wrapper {
				background-color: #fff;
				overflow: hidden;
				padding:0 18px;
				max-height: 217px;
				.food {
					padding: 12px 0;
					box-sizing: border-box;
					font-size: 14px;
					color:rgb(7,17,27);
					line-height: 24px;
					position: relative;
					.foodprice {
						font-size: 10px;
						font-weight: 700;
						color:rgb(240,20,20);
						line-height: 24px;
						height: 24px;
						position: absolute;
						right:100px;
					}
					.cartctl-wrapper {
						position: absolute;
						right: 0;
						bottom:6px;
						.cartctl {
							font-size: 24px;
							color:rgb(0,160,220);
						}
					}
				}
			}
		}
		.fold-enter-active, .fold-leave-active {
			transition: all .5s;
		}
		.fold-enter, .fold-leave-active {
			transform: translate3d(0,0,0);
		}
		.listmask {
			width:100%;
			height: 100%;
			position: fixed;
			top:0;
			left:0;
			background:rgba(7,17,27,0.6);
			filter:blur(10px);
			z-index:30;

		}
	}
</style>
