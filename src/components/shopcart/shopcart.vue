<template>
	<div class="shopcart">
		<div class="cartWrapper">
			<div class="content-left">
				<div class="cartImg">
					<div class="imgWrapper" @click="viewCart" :class="{highlight:cartCnt>0}">
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
			<div class="content-rigth" :class="{highlight:leftPrice<=0}">{{cartDesc}}</div>
		</div>
		<div class="ball-container">
			<div v-for="ball in balls">
				<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
					<div class="ball" v-show="ball.show">
						<div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>
<script>
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
		data: function () {
			return {
				leftPrice: this.minPrice,
				balls: [
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				}
				],
				dropBalls: []
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
			}
		},
		methods: {
			viewCart: function () {
			},
			dropBall: function (el) {
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeDrop: function (el) {
				let count = this.balls.length;
				while (count--) {
					let ball = this.balls[count];
					if (ball.show) {
						let rect = ball.el.getBoundingClientRect();
						let x = rect.left - 32;
						let y = -(window.innerHeight - rect.top - 22);
						el.style.display = '';
						el.style.webkitTransform = `translate3d(0,${y}px,0)`;
						el.style.transform = `translate3d(0,${y}px,0)`;
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
						inner.style.transform = `translate3d(${x}px,0,0)`;
						console.log(el);
						console.log(inner);
					}
				}
			},
			dropping: function (el, done) {
				/* eslint-disable no-unused-vars */
				let rf = el.offsetHeight;
				this.$nextTick(() => {
					el.style.webkitTransform = 'translate3d(0,0,0)';
					el.style.transform = 'translate3d(0,0,0)';
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = 'translate3d(0,0,0)';
					inner.style.transform = 'translate3d(0,0,0)';
					el.addEventListener('transitionend', done);
				});
			},
			afterDrop: function (el) {
				let ball = this.dropBalls.shift();
				if (ball) {
					ball.show = false;
					el.style.display = 'none';
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
		z-index: 10;
		.cartWrapper {
			display: flex;
			.content-left {
				flex: 1;
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
				&.highlight {
					background-color: rgb(69,209,79);
					color:rgb(255,255,255);
				}
			}
			.ball {
				position: fixed;
				left: 32px;
				bottom: 22px;
				z-index: 200;
				// transition: all 5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
				transition: all 5s;
				.inner{
					width: 16px;
					height: 16px;
					border-radius: 50%;
					background: rgb(0, 160, 220);
					transition: all 0.4s linear;
				}
			}
		}
	}
</style>
