<template>
	<div class="header">
		<!-- 内容区域 -->
		<div class="content-wrapper">
			<!-- 头像 -->
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="desc">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if="seller.supports">
					<span class="support-icon" :class="getIconByType(seller.supports[0].type)"></span>
					<span class="support-content">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count">
				<span>{{seller.supports.length}}个</span>
				<span class="icon-keyboard_arrow_right"></span>
			</div>
		</div>
		<!-- 公告区域 -->
		<div class="bulletin-wrapper"></div>
	</div>
</template>

<script>
	export default {
		name: 'header',
		props: ['seller'],
		methods: {
			getIconByType: function (type) {
				var classList = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
				return classList[type];
			}
		}
	};
</script>

<style lang="less" rel="stylesheet/less">
	.header	{
		color:#fff;
		background-color: #ccc;
		font-size:0;
	}
	.content-wrapper {
		padding:24px 12px 18px 24px;
		position: relative;
	}

	.content-wrapper .avatar {
		display: inline-block;
		vertical-align: top;
	}
	.content-wrapper .avatar img {
		border-radius: 4px;
	}	
	.content-wrapper .content {
		display: inline-block;
		font-size: 14px;
		margin-left: 16px;
		vertical-align: top;
	}
	.title {
		vertical-align: top;
	}
	.brand {
		display: inline-block;
		width:30px;
		height: 18px;
		background-image: url('brand@2x.png');
		-moz-background-size:100% 100%;
		background-size:100% 100%;
		-webkit-background-size:100% 100%;
	}
	.name {
		display: inline-block;
		font-size: 16px;
		line-height: 16px;
		font-weight: bold;
		color:rgb(255,255,255);
		vertical-align: top;
	}
	.desc {
		margin:8px 0 10px 0;
		font-size: 12px;
		color: rgb(255,255,255);
		font-weight: 200;
		line-height: 12px;
	}

	.support {
		vertical-align: top;
	}

	.support-icon {
		display: inline-block;
		width:12px;
		height: 12px;
		-moz-background-size:100% 100%;
		background-size:100% 100%;
		-webkit-background-size:100% 100%;
	}
	.decrease {
		background-image: url("decrease_1@2x.png");
	}
	.discount {
		background-image: url("discount_1@2x.png");
	}
	.guarantee {
		background-image: url("guarantee_1@2x.png");
	}
	.invoice {
		background-image: url("invoice_1@2x.png");
	}
	.special {
		background-image: url("special_1@2x.png");
	}
	.support-content {
		font-size: 10px;
		color:rgb(255,255,255);
		font-weight: 200;
		line-height: 12px;
		vertical-align: top;
	}

	.support-count {
		width:48px;
		height:24px;
		position: absolute;
		right: 12px;
		bottom:18px;
		font-size: 10px;
		color:rgb(255,255,255);
		font-weight: 200;
		line-height: 24px;
		border-radius: 8px 7px 7px 8px;
		background-color: rgba(0,0,0,0.2);
		text-align: center;
		vertical-align: top;
	}
	.icon-keyboard_arrow_right {
		line-height: 24px;
	}
	
</style>
