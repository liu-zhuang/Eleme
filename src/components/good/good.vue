<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(good,index) in goods" class="menuItem menu-hock" :class="{current: currentIndex === index}" @click.stop="selectGood(index,$event)">
					<span class="text"><support v-show="good.type>0" :supportType="good.type" :iconSize="3"></support>{{good.name}}</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper" ref="goodsWrapper">
			<ul class="goodList">
				<li v-for="good in goods" class="good-hock">
					<h4 class="good-name">{{good.name}}</h4>
					<ul class="foodList">
						<li v-for="food in good.foods" class="food">
							<div class="food-icon" >
								<img width="57px" height="57px" :src="food.icon" alt="">
							</div>
							<div class="food-wrapper">
								<h2 class="foodName">{{food.name}}</h2>
								<p v-show="food.description" class="foodDesc">{{food.description}}</p>
								<div class="extra">
									<span>
										月售{{food.sellCount}}份
									</span>
									<span>
										好评率{{food.rating}}%
									</span>
								</div>
								<div class="price">
									<span class="new">
										{{food.price | filterCurrency}}
									</span>
									<span v-show="food.oldPrice" class="old">
										{{food.oldPrice | filterCurrency}}
									</span>
									<cartctl @cartadd="cartAdd" class="cartctl" :food="food"></cartctl>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart ref="shopcart" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :selected-food="selectedFood"></shopcart>
	</div>
</template>
<script>
	import support from '../support/support';
	import BScroll from 'better-scroll';
	import shopcart from '../shopcart/shopcart';
	import cartctl from '../cartctl/cartctl';
	export default{
		props: ['seller'],
		components: { support, shopcart, cartctl },
		data: function () {
			return {
				goods: [],
				menuScroll: Object,
				goodsScroll: Object,
				listHeight: [0],
				menuHeight: [],
				scrollY: 0,
				menuScrollY: 0
			};
		},
		methods: {
			initScroll: function () {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				});
				this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
					click: true,
					probeType: 3
				});
				this.goodsScroll.on('scroll', pos => {
					this.scrollY = Math.abs(Math.round(pos.y));
					let menu = this.$refs.menuWrapper.getElementsByClassName('menu-hock');
					// let goodDom = this.$refs.menuWrapper;
					// if (this.menuHeight[this.currentIndex] > goodDom.clientHeight) {
					// 	var el = menu[this.currentIndex];
					// 	this.menuScroll.scrollToElement(el, 300);
					// }
                    // 当左侧菜单高度小于视口高度时，左侧高亮也会随之滚动
                    var el = menu[this.currentIndex];
                    this.menuScroll.scrollToElement(el, 300);
                });
				this.menuScroll.on('scroll', pos => {
					this.menuScrollY = Math.abs(Math.round(pos.y));
				});
			},
			calcHeight: function () {
				let goodList = this.$refs.goodsWrapper.getElementsByClassName('good-hock');
				let tempHeight = 0;
				for (let i = 0; i < goodList.length; i++) {
					tempHeight += goodList[i].clientHeight;
					this.listHeight.push(tempHeight);
				}
				let menu = this.$refs.menuWrapper.getElementsByClassName('menu-hock');
				tempHeight = 0;
				for (let i = 0; i < menu.length; i++) {
					tempHeight += menu[i].clientHeight;
					this.menuHeight.push(tempHeight);
				}
			},
			selectGood: function (index, event) {
				if (event._constructed) {
					let goodList = this.$refs.goodsWrapper.getElementsByClassName('good-hock');
					var el = goodList[index];
					this.goodsScroll.scrollToElement(el, 300);
				}
			},
			cartAdd: function (el) {
				this.$refs.shopcart.dropBall(el);
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				// 开发
				let urlGoods = '/api/goods';
				// 生产
				// let urlGoods = 'http://liuzhuang.tech/eleme/data.json';
				this.axios.get(urlGoods)
				.then(res => {
					// 开发
					if (res.data.errno === 0) {
						this.goods = res.data.data;
						this.$nextTick(function () {
							this.initScroll();
							this.calcHeight();
						});
					}
					// 生产
					// this.goods = res.data.goods;
					// this.$nextTick(function () {
					// 	this.initScroll();
					// 	this.calcHeight();
					// });
				})
				.catch(function () {
					console.log('get goods occur error...');
				});
			});
		},
		filters: {
			filterCurrency: function (val) {
				return '¥' + val;
			}
		},
		computed: {
			currentIndex: function () {
				for (let i = 0; i < this.listHeight.length; i++) {
					var h1 = this.listHeight[i];
					var h2 = this.listHeight[i + 1];
					if (!h2 || (this.scrollY < h2 && this.scrollY >= h1)) {
						return i;
					}
				}
			},
			selectedFood: function () {
				var retList = [];
				this.goods.forEach(good => {
					good.foods.forEach(food => {
						if (food.cnt && food.cnt > 0) {
							retList.push(food);
						}
					});
				});
				return retList;
			}
		}
		// watch: {
		// 	currentIndex: function (val) {
		// 		let menu = this.$refs.menuWrapper.getElementsByClassName('menu-hock');
		// 		let goodDom = this.$refs.menuWrapper;
		// 		if (this.menuHeight[val] > goodDom.clientHeight) {
		// 			var el = menu[val];
		// 			this.menuScroll.scrollToElement(el, 300);
		// 		}
		// 	}
		// }
	};
</script>
<style lang='less'>
	.goods {
		position: absolute;
		display: flex;
		top:179px;
		bottom:48px;
		overflow: hidden;
		font-size: 48px;
		width:100%;

		.menu-wrapper {
			flex: 0 0 80px;
			width: 0 0 80px;
			background-color: #f3f5f7;
			font-size: 12px;
			color:rgb(240,20,20);
			font-weight: 200;
			line-height: 28px;
			.menuItem {
				display: flex;
				justify-content:center;
				align-items:center;
				width: 56px;
				padding: 0 12px;
				height: 54px;
				vertical-align: middle;
				line-height: 14px;
				border-bottom: solid 1px rgba(7,17,27,0.1);
				
			}
			.current {
				margin-top: -1px;
				background: #fff;
			}
		}
		.goods-wrapper {
			flex: 1;
			.good-name {
				width:100%;
				height: 26px;
				line-height: 26px;
				border-left:2px solid #d9dde1;
				font-size: 12px;
				color:rgb(147,153,159);
				background: #f3f5f7;
			}
			.food {
				display: flex;
				.food-icon {
					width:57px;
					height: 57px;
					flex: 0 0 57px;
					margin: 18px 10px 18px 18px;
				}
				.food-wrapper {
					flex: 1;
					margin: 18px 18px 0px 0px;
					.foodName {
						font-size: 14px;
						color:rgb(7,17,27);
						line-height: 14px;
						padding-top:2px;
					}
					.foodDesc {
						font-size: 10px;
						color:rgb(147,153,159);
						line-height: 14px;
						margin: 8px 0 0 0;
					}
					.extra {
						font-size: 10px;
						color:rgb(147,153,159);
						line-height: 10px;
						margin-top:8px;
					}
					.price {
						font-size: 10px;
						color:rgb(147,153,159);
						line-height: 24px;
						margin-top:8px;
						.new {
							color:rgb(240,20,20);
							font-weight: 700;
							font-size: 14px;
						}
						.old {
							text-decoration:line-through;
						}
						.cartctl {
							position:absolute;
							right: 24px;
							/*bottom:24px;*/
							color:rgb(0,160,220);
							font-size: 24px;
							line-height: 24px;
						}
					}
				}
			}

		}
	}
	
</style>
