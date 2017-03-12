<template>
	<div class="ratingtabs-wrapper">
		<div class="tabs-head">
			<h2 class="title">商品评价</h2>
			<ul class="tabs">
				<li  v-for="tab in tabsContent" class="tab-block" :class="blockCss(tab)" @click="selectTab(tab.type)">
					<span class="tab-block-name">{{tab.name}}</span>
					<span class="tab-block-cnt">{{tabCnt(tab)}}</span>
				</li>
			</ul>
		</div>
		<div class="tabsfilter" :class="{'selected':onlyShowContent}" @click="toggle($event)">
			<i class="icon-check_circle" ></i>只看有内容的评价
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			isFilter: {
				type: Boolean
			},
			tabsContent: {
				type: Array
			},
			ratings: {
				type: Array
			},
			currentTab: {
				type: [String, Number]
			}
		},
		data: function () {
			return {
				selectedTab: this.currentTab,
				onlyShowContent: this.isFilter
			};
		},
		methods: {
			blockCss: function (tab) {
				var ret = 'block-' + tab.type;
				if (tab.type === this.selectedTab) {
					ret += ' selected';
				}
				return ret;
			},
			selectTab: function (type) {
				this.selectedTab = type;
				this.$emit('selectTab', type);
			},
			tabCnt: function (tab) {
				if (tab.type === 'all') {
					if (this.ratingList) {
						return this.ratingList.length;
					}
				} else {
					if (this.ratingList) {
						return this.ratingList.filter((rating) => {
							return rating.rateType === tab.type - 0;
						}).length;
					}
				}
			},
			toggle: function (event) {
				this.onlyShowContent = !this.onlyShowContent;
				this.$emit('toggleShowContent', this.onlyShowContent);
			}
		},
		computed: {
			ratingList: function () {
				return this.ratings;
			}
		}
	};
</script>
<style lang="less">
	._selectedTab {
		background: rgb(0,160,220);
		color:rgb(255,255,255);
	}
	.ratingtabs-wrapper {
		.tabs-head {
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
		.tabsfilter {
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
	}
</style>
