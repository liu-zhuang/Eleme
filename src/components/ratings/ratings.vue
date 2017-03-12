<template>
	<div class="ratings-wrapper">
		<div class="rating-content" ref="ratingContent">
			<div>
				<div class="overview">
					<div class="overview-left">
						<h1 class="score">{{seller.score}}</h1>
						<h2 class="score-desc">综合评分</h2>
						<h3 class="rankRate">高于周边商家{{seller.rankRate}}%</h3>
					</div>
					<div class="overview-right">
						<div class="CategoryScore">
							<span>服务态度</span>
							<div class="star-wrapper">
								<star :starSize="36" :score="seller.serviceScore"></star>
							</div>
						</div>
						<div class="CategoryScore">
							<span>食品质量</span>
							<div class="star-wrapper">
								<star :starSize="36" :score="seller.foodScore"></star>
							</div>
						</div>
						<div class="CategoryScore">
							<span>送达时间</span>
							<span class="delivertime">{{seller.deliveryTime}}分钟</span>
						</div>
					</div>
				</div>
				<split></split>
				<ratingtabs ref="ratingtabs" :tabsContent="tabsContent" :ratings="ratings" :currentTab="currentTab" :isFilter="isFilter" @selectTab="filterRatingData" @toggleShowContent="filterRatingData"></ratingtabs>
				<ul class="ratingDetailList">
					<li v-for="rating in showRatings" class="ratingItem">
						<div class="ratingItem-left">
							<img class="avatar" width="28px" height="28px" :src="rating.avatar" alt="">
						</div>
						<div class="ratingItem-right">
							<div class="username">{{rating.username}}</div>
							<div class="star-wrapper">
								<star :starSize="24" :score="rating.score"></star>
								<span v-show="rating.deliveryTime" class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<div class="text">{{rating.text}}</div>
							<div class="ratingIcon"></div>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length> 0">
								<i class="icon-thumb_up"></i>
								<ul>
									<li class="recommendItem" v-for="rec in rating.recommend">{{rec}}</li>
								</ul>
							</div>
							<span class="rateTime">{{rating.rateTime | dateFilter}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import BSCroll from 'better-scroll';
	import star from '../star/star';
	import split from '../split/split';
	import ratingtabs from '../ratingtabs/ratingtabs';

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data: function () {
			return {
				ratings: [],
				tabsContent: [{type: 'all', name: '全部'},
				{type: '0', name: '满意'},
				{type: '1', name: '不满意'}],
				currentTab: 'all',
				isFilter: false,
				showRatings: this.ratings
			};
		},
		components: {BSCroll, star, split, ratingtabs},
		methods: {
			initScroll: function () {
				this.ratingScroll = new BSCroll(this.$refs.ratingContent, {
					click: true
				});
			},
			refreshScroll: function () {
				this.ratingScroll.refresh();
			},
			filterRatingData: function () {
				var component = this.$refs.ratingtabs;
				var type = component.selectedTab;
				var hasContent = component.onlyShowContent;
				this.showRatings = this.ratings.filter((rating) => {
					if (type === 'all') {
						return hasContent ? rating.text : rating.username;
					} else {
						console.log(rating.rateType === (type - 0) && (hasContent ? rating.text : rating.username));
						return rating.rateType === (type - 0) && (hasContent ? rating.text : rating.username);
					}
				});
				this.$nextTick(() => {
					this.refreshScroll();
				});
			}
		},
		mounted: function () {
			this.$nextTick(() => {
				// 开发
				// let url = '/api/ratings';
				// 生产
				let url = 'http://liuzhuang.tech/eleme/data.json';
				this.axios.get(url)
				.then(res => {
					// 开发
					// if (res.data.errno === 0) {
					// 	this.ratings = res.data.data;
					// 	this.showRatings = this.ratings;
					// 	this.$nextTick(function () {
					// 		this.initScroll();
					// 	});
					// }
					// 生产
					this.ratings = res.data.ratings;
					this.$nextTick(function () {
						this.initScroll();
					});
				})
				.catch(function () {
					console.log('get goods occur error...');
				});
			});
		},
		filters: {
			dateFilter: function (val) {
				if (val) {
					var temp = new Date(val);
					return temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate() + '  ' + temp.getHours() + ':' + temp.getMinutes();
				} else {
					return val;
				}
			}
		}
	};
</script>
<style lang="less">
	.ratings-wrapper {
		position: absolute;
		top: 179px;
		left: 0;
		width:100%;
		bottom:0;
		z-index: 30;
		overflow: hidden;
		.rating-content {
			width:100%;
			height: 100%;
		}
		.overview {
			display: flex;
			padding: 6px 0;
			.overview-left {
				width:137px;
				flex: 0 0 137px;
				@media screen and (device-aspect-ratio: 40/71) {  
					width:120px;
					flex: 0 0 120px;
				}
				border-right: solid 1px rgba(7,17,27,0.2);
				.score {
					text-align: center;
					margin-top: 18px;
					font-size: 24px;
					color:rgb(255,153,0);
					line-height: 28px;
				}
				.score-desc {
					font-size: 12px;
					color: rgb(7,17,27);
					line-height: 12px;
					text-align: center;
					margin-top: 6px;
				}
				.rankRate {
					font-size: 10px;
					color:rgb(7,17,27);
					line-height: 10px;
					margin-top: 12px;
					text-align: center;
				}
			}
			.overview-right {
				flex:1;
				padding: 18px 24px;
				.CategoryScore {
					font-size: 12px;
					color: rgb(7,17,27);
					line-height: 18px;
					.star-wrapper {
						display: inline-block;
						margin: 0 0 8px 0 ;
						padding:0;
					}
					.delivertime {
						color: rgb(147,153,159);
					}
				}
			}
		}
		.ratingItem {
			margin: 0 18px;
			padding: 18px 0;
			display: flex;
			.ratingItem-left {
				flex: 0 0 40px;
				width: 40px;
				.avatar {
					border-radius: 50%;
				}
			}
			.ratingItem-right {
				flex: 1;
				position: relative;
				.username {
					font-size: 10px;
					color:rgb(7,17,27);
					line-height: 12px;
				}
				.star-wrapper {
					margin: 4px 0 6px 0;
					text-align: left;
					font-size: 10px;
					font-weight: 200;
					color: rgb(147,153,159);
					line-height: 12px;
					.ratings {
						display: inline-block;
					}
				}
				.text {
					font-size: 12px;
					color: rgb(7,17,27);
					line-height: 18px;
				}
				.recommend {
					margin-top: 8px;
					display: flex;
					align-items: flex-start;
					.icon-thumb_up {
						flex: 0 0 24px;
						color: rgb(0,160,220);
						font-size: 12px;
						line-height: 16px;
						padding: 8px 0;
					}
					.recommendItem {
						flex: 1;
						display: inline-block;
						flex-wrap: nowrap;
						font-size: 9px;
						color: rgb(147,153,159);
						line-height: 16px;
						border: solid 1px rgba(7,17,27,0.1);
						border-radius: 1px;
						padding: 8px 6px;
						margin-right: 8px;
						margin-bottom: 8px;
					}
				}
				.rateTime {
					position: absolute;
					right: 0;
					top:0;
					font-size: 10px;
					font-weight: 200;
					color:rgb(147,153,159);
					line-height: 12px;
				}

			}
		}
	}
</style>
