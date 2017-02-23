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
					<span class="icon"></span>
					<span class="support-content">{{seller.supports[0].description}}</span>
				</div>
			</div>
		</div>
		<!-- 公告区域 -->
		<div class="bulletin-wrapper"></div>
	</div>
</template>

<script>
	export default {
		name: 'header',
		props: ['seller']
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
	
</style>
