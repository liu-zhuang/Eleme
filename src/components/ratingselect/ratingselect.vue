<template>
	<div class="ratingselect-wrapper">
		<div class="rating-head">
			<h2 class="title">商品评价</h2>
			<ul class="tabs">
				<li @click="clickTab(tab.type,$event)" v-for="tab in tabsContent" class="tab-block" :class="blockCss(tab)">
					<span class="tab-block-name">{{tab.name}}</span>
					<span class="tab-block-cnt">{{tabCnt(tab)}}</span>
				</li>
			</ul>
		</div>
		<div class="filter" :class="{'selected':isFilter}" @click="clickFilter($event)">
			<i class="icon-check_circle" ></i>只看有内容的评价
		</div>
		<ul class="ratings">
			<li v-for="rating in showRatings" class="ratingItem">
				<div class="ratingItem-left">
					<div class="date">{{rating.rateTime | dateFilter}}</div>
					<div class="desc">
						<div class="type" :class="{'up':rating.rateType == 0}"><i :class="ratingIcon(rating.rateType)"></i></div>
						<div class="ratingDesc">{{rating.text}}</div>
					</div>
				</div>
				<div class="ratingItem-right">
					<div class="avatar"><img :src="rating.avatar" width="12px" height="12px"></div>
					<div class="user">{{rating.username}}</div>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: ['ratings', 'tabsContent'],
		data: function () {
			return {
				currentTab: 'all',
				isFilter: false
			};
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
		},
		watch: {
			ratings: function () {
				this.$emit('refreshScroll');
			}
		},
		methods: {
			blockCss: function (tab) {
				var ret = 'block-' + tab.type;
				if (tab.type === this.currentTab) {
					ret += ' selected';
				}
				return ret;
			},
			clickTab: function (type) {
				this.currentTab = type;
				this.$emit('refreshScroll');
			},
			tabCnt: function (tab) {
				if (tab.type === 'all') {
					if (this.ratings) {
						return this.ratings.length;
					}
				} else {
					if (this.ratings) {
						return this.ratings.filter((rating) => {
							return rating.rateType === tab.type - 0;
						}).length;
					}
				}
			},
			clickFilter: function () {
				this.isFilter = !this.isFilter;
				this.$nextTick(() => {
					this.$emit('refreshScroll');
				});
			},
			ratingIcon: function (type) {
				if (type === 0) {
					return 'icon-thumb_up';
				} else {
					return 'icon-thumb_down';
				}
			},
			initData: function () {
				this.currentTab = 'all';
				this.isFilter = false;
			}
		},
		computed: {
			showRatings: function () {
				if (this.currentTab !== 'all') {
					if (this.ratings) {
						return this.ratings.filter((rating) => {
							return rating.rateType === this.currentTab - 0 && (this.isFilter ? rating.text : rating.username);
						});
					}
				} else {
					if (this.ratings) {
						return this.ratings.filter((rating) => {
							return this.isFilter ? rating.text : rating.username;
						});
					}
				}
			}
		}
	};
</script>
<style lang="less">
	._selectedTab {
		background: rgb(0,160,220);
		color:rgb(255,255,255);
	}
	.ratingselect-wrapper {
		.rating-head {
			margin: 18px;
			border-bottom: solid 1px rgba(7,17,27,0.2);
			padding-bottom: 18px;
			.title {
				font-size: 14px;
				color: rgb(7,17,27);
				line-height: 14px;
			}
			.tabs {
				margin-top: 18px;
				vertical-align: top;
				display:block;
				font-size: 12px;
				.tab-block {
					display: inline-block;
					height: 32px;
					width: 64px;
					padding: 8px 12px;
					text-align: center;
					line-height: 32px;
					color:rgb(75,85,93);
					border-radius: 6px;
					margin-right: 8px;
					.tab-block-name {
						font-size: 14px;
					}
					.tab-block-cnt {
						font-size: 8px;
					}
					&:last-child {
						margin-right: 0;
					}
				}
				.block-all {
					background: rgba(0,160,220,0.4);
					&.selected {
						._selectedTab;
					}
				}
				.block-0 {
					background: rgba(0,160,220,0.2);
					&.selected {
						._selectedTab;
					}
				}
				.block-1 {
					background: rgba(77,85,93,0.2);
					&.selected {
						._selectedTab;
					}
				}
			}
		}
		.filter {
			width:100%;
			box-sizing: border-box;
			padding: 12px 18px;
			font-size: 14px;
			line-height: 24px;
			color: rgb(147,153,159);
			border-bottom: solid 1px rgba(7,17,27,0.1);
			.icon-check_circle {
				margin-right: 4px;
			}
			&.selected {
				color: rgb(0,160,220);
			}
		}
		.ratings {
			margin: 12px 18px 18px 18px;
			.ratingItem {
				display: flex;
				padding: 16px 0;
				height: 36px;
				border-bottom: solid 1px rgba(7,17,27,0.1);
				.ratingItem-left {
					flex: 1;
					font-size: 12px;
					.date {
						font-size: 10px;
						color: rgb(147,153,159);
						line-height: 12px;
					}
					.desc {
						margin-top: 6px;
						font-size: 12px;
						.type {
							display: inline-block;
							color: rgb(147,153,159);
							line-height: 24px;
							&.up {
								color:rgb(0,160,220);
							}
						}
						.ratingDesc {
							display: inline-block;
							color: rgb(7,17,27);
							line-height: 16px;
						}
					}
					
				}
				.ratingItem-right {
					flex: 0 0 65px;
					align-items: flex-start;
					width:65px;
					position: relative;
					.user {
						display: inline-block;
						font-size: 10px;
						color: rgb(147,153,159);
						position: absolute;
						top:0;
						right:12px;
						margin-right: 3px;
					}
					.avatar {
						position: absolute;
						top:0;
						right:0;
						display: inline-block;
						width:12px;
						height: 12px;
						border-radius: 50%;
						img {
							position: absolute;
							top:0;
							border-radius: 50%;
						}
					}
				}
			}
		}
		
	}
</style>
