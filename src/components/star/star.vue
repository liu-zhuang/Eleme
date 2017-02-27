<template>
	<div class="ratings">
		<ul  :class="starType">
			<li v-for="star in starList" class="starCommon starItem" :class="star">
			</li>
		</ul>
	</div>
</template>
<script>
	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';
	export default {
		props: {
			starSize: Number,
			score: Number
		},
		computed: {
			starType: function () {
				return 'starSize-' + this.starSize;
			},
			starList: function () {
				// 通过向下取整的方式计算一共有几颗星
				var starCnt = Math.floor(this.score);
				var result = [];
				// 有几颗星加几个'on'
				for (let i = 0; i < starCnt; i++) {
					result.push(CLS_ON);
				}
				// 分数减去星数获取剩余小数点后面的分数
				var leftVal = this.score - starCnt;
				// 如果大于等于0.5增增加一个半星
				if (leftVal >= 0.5) {
					result.push(CLS_HALF);
				}
				// 如果结果数组的长度小于5，则补空星
				while (result.length < LENGTH) {
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	};
</script>
<style type="text/css" lang="less">
	.ratings {
		.starCommon {
			display: inline-block;
			background-repeat: no-repeat;
			-moz-background-size:100% 100%;
			background-size:100% 100%;
			-webkit-background-size:100% 100%;
		}
		.starSize-24 {			
			.starItem {
				width:10px;
				height: 10px;
				margin-right: 3px;	
			}
			.starItem:last-child {
				margin-right: 0px;
			}	
			.on {
				background-image: url('star24_on@2x.png');
			}
			.half {
				background-image: url('star24_half@2x.png');
			}
			.off {
				background-image: url('star24_off@2x.png');
			}
		}
		.starSize-36 {
			.starItem {
				width:15px;
				height: 15px;
				margin-right: 6px;	
			}
			.starItem:last-child {
				margin-right: 0px;
			}	
			.on {
				background-image: url('star36_on@2x.png');
			}
			.half {
				background-image: url('star36_half@2x.png');
			}
			.off {
				background-image: url('star36_off@2x.png');
			}
		}
		.starSize-48 {
			.starItem {
				width:20px;
				height: 20px;
				margin-right: 22px;	
			}
			.starItem:last-child {
				margin-right: 0px;
			}	
			.on {
				background-image: url('star48_on@2x.png');
			}
			.half {
				background-image: url('star48_half@2x.png');
			}
			.off {
				background-image: url('star48_off@2x.png');
			}
		}
	}
</style>
