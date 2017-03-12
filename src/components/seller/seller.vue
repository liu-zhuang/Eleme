<template>
	<div class="seller-wrapper" ref="sellerWrapper">
		<div class="seller-content">
			<div class="overview">
				<div class="overview-up">
					<h1 class="title">{{seller.name}}</h1>
					<div class="score">
						<div class="starctl-wrapper">
							<star :starSize="36" :score="seller.score"></star>
						</div>
						<span class="ratingCount">({{seller.ratingCount}})</span>
						<span class="sellCount">月售{{seller.sellCount}}单</span>
					</div>
					<div class="favorite" @click="clkFavorite">
						<i class="icon-favorite" :class="{'active':isFavorite}"></i>
						<h3 class="favoriteTxt">{{favoriteTxt}}</h3>
					</div>
				</div>
				<div class="overview-down">
					<div class="overview-down-item">
						<p class="title">起送价</p>
						<p class="num">{{seller.minPrice}}<span class="unit">元</span></p>
					</div>
					<div class="overview-down-item">
						<p class="title">商家配送</p>
						<p class="num">{{seller.deliveryPrice}}<span class="unit">元</span></p>
					</div>
					<div class="overview-down-item">
						<p class="title">平均配送时间</p>
						<p class="num">{{seller.deliveryTime}}<span class="unit">分钟</span></p>
					</div>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h2 class="title">公告与活动</h2>
				<div class="bulletinContent">{{seller.bulletin}}</div>
			</div>
			<div class="support" v-show="seller.supports">
				<ul>
					<li v-for="support in seller.supports" class="support-item">
						<!-- <span class="support-icon" :class="getIconByType(support.type)"></span> -->
						<support :supportType="support.type" :iconSize="4"></support>
						<span class="support-content">{{support.description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pic">
				<h2 class="title">商家实景</h2>
				<div class="picWrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li v-for="pic in seller.pics" class="pic-item">
							<img :src="pic" width="120px" height="90px">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
			<split style="margin-bottom:10px;"></split>
		</div>
	</div>
</template>
<script>
	import star from '../star/star';
	import split from '../split/split';
	import support from '../support/support';
	import BSCroll from 'better-scroll';

	export default {
		props: ['seller'],
		components: {star, split, support},
		data: function () {
			return {
				isFavorite: false
			};
		},
		mounted: function () {
			this.$nextTick(() => {
				this.initScroll();
				this.initPics();
			});
		},
		methods: {
			clkFavorite: function () {
				this.isFavorite = !this.isFavorite;
			},
			initScroll: function () {
				if (!this.scroll) {
					this.scroll = new BSCroll(this.$refs.sellerWrapper, {
						click: true
					});
				} else {
					this.scroll.refresh();
				}
			},
			initPics: function () {
				if (this.seller.pics) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth + margin) * this.seller.pics.length - margin;
					this.$refs.picList.style.width = width + 'px';
					this.$nextTick(() => {
						if (!this.picScroll) {
							this.picScroll = new BSCroll(this.$refs.picWrapper, {
								scrollX: true,
								eventPassthrough: 'vertical'
							});
						} else {
							this.picScroll.refresh();
						}
					});
				}
			}
		},
		computed: {
			favoriteTxt: function () {
				return this.isFavorite ? '已收藏' : '收藏';
			}
		}
	};
</script>
<style lang="less">
	.seller-wrapper {
		position: absolute;
		top: 179px;
		left: 0;
		width:100%;
		bottom:0;
		z-index: 30;
		overflow: hidden;
		.seller-content {
			.overview {
				margin: 18px;
				position: relative;
				.overview-up {
					padding-bottom: 18px;
					border-bottom: solid 1px rgba(7,17,27,0.1);
					.title {
						font-size: 14px;
						color: rgb(7,17,27);
						line-height: 14px;
					}
					.score {
						margin: 8px 0 0 0 ;
						.starctl-wrapper {
							display: inline-block;
							margin-right: 8px;
						}
						.ratingCount {
							margin-right: 8px;
							font-size: 10px;
							color: rgb(77,85,93);
							line-height: 18px;
							vertical-align: top;
						}
						.sellCount {
							font-size: 10px;
							color: rgb(77,85,93);
							line-height: 18px;
							vertical-align: top;
						}
					}
				}
				.overview-down {
					display: flex;
					.overview-down-item {
						flex: 1;
						text-align: center;
						margin-top: 18px;
						border-right: solid 1px rgba(7,17,27,0.1);
						.title {
							font-size: 10px;
							color: rgb(147,153,159);
							line-height: 10px;
						}
						.num {
							font-size: 24px;
							font-weight: 200;
							color: rgb(7,17,27);
							line-height: 24px;
							margin-top: 8px;
						}
						.unit {
							font-size: 10px;

						}
						&:last-child {
							border-right: 0;
						}
					}

				}
				.favorite {
					position: absolute;
					right: 0;
					top: 0;
					width:80px;
					font-size: 24px;
					line-height: 24px;
					text-align: center;
					color: rgba(7,17,27,0.2);
					.icon-favorite {
						&.active {
							color: rgb(240,20,20)
						}
					}
					.favoriteTxt {
						font-size: 10px;
						color: rgb(77,85,93);
						line-height: 10px;
						margin-top: 4px;
					}
				}
			}
			.bulletin {
				margin: 18px 18px 0 18px;
				.title {
					font-size: 14px;
					line-height: 14px;
					color: rgb(7,17,27);
				}
				.bulletinContent {
					padding: 8px 12px 16px 12px;
					font-size: 12px;
					font-weight: 200;
					color: rgb(240,20,20);
					line-height: 24px;
				}
			}
			.support {
				margin: 0 18px;
				.support-item {
					border-top: solid 1px rgba(7,17,27,0.1);
					padding: 16px 12px;
					.support-content {
						font-size: 12px;
						font-weight: 200;
						color: rgb(7,17,27);
						line-height: 16px;
					}
				}
			}
			.pic {
				margin: 18px;
				.title {
					font-size: 14px;
					line-height: 14px;
					color: rgb(7,17,27);
				}
				.picWrapper {
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					.pic-list {
						margin-top: 12px;
						.pic-item {
							display: inline-block;
							margin-right: 6px;
						}
					}
				}
			}
			.info {
				padding: 18px 18px 0 18px;
				color: rgb(7, 17, 27);
				.title {
					padding-bottom: 12px;
					line-height: 14px;
					border-bottom: solid 1px rgba(7, 17, 27, 0.1);
					font-size: 14px;
				}
				.info-item {
					padding: 16px 12px;
					line-height: 16px;
					border-bottom: solid 1px rgba(7, 17, 27, 0.1);
					font-size: 12px;
					&:last-child {
						border:0;
					}
				}
			}
		}
	}
</style>
