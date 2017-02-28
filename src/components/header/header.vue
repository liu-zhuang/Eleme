<template>
	<div class="header">
		<!-- 内容区域 -->
		<div class="content-wrapper">
			<!-- 头像 -->
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<!-- 内容 -->
			<div class="content">
				<div class="title">
					<!-- 品牌图标 -->
					<span class="brand"></span>
					<!-- 商家名称/ -->
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="desc">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if="seller.supports">
					<support :supportType="seller.supports[0].type" :iconSize="2"></support>
					<span class="support-content">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span>{{seller.supports.length}}个</span>
				<span class="icon-keyboard_arrow_right"></span>
			</div>
		</div>
		<!-- 公告区域 -->
		<div class="bulletin-wrapper">
			<span class="bulletin-icon"></span>
			<span class="bulletin-content">{{seller.bulletin}}</span>
			<span class="icon-keyboard_arrow_right" @click="showDetail"></span>
		</div>
		<!-- header的背景 -->
		<!-- 商家avatar全屏模糊处理 -->
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<!-- 查看详情内容 -->
		<transition name="fade">
			<div v-show="detailShow" class="detail">
				<div class="detail-wrapper clearfix">
					<div class="detail-content">
						<h1 class="detail-name">
							{{seller.name}}
						</h1>
						<div class="star-wrapper">
							<star :starSize="48" :score="seller.score"></star>
						</div>
						<div class="detail-support">
							<div class="support-line"></div>
							<div class="support-title">优惠信息</div>
							<div class="support-line"></div>
						</div>
						<div class="support-content-detail">
							<ul v-if="seller.supports">
								<li v-for="support in seller.supports" class="support-li">
									<!-- <span class="support-icon" :class="getIconByType(support.type)"></span> -->
									<support :supportType="support.type" :iconSize="2"></support>
									<span class="support-content">{{support.description}}</span>
								</li>
							</ul>
						</div>
						<div class="detail-support">
							<div class="support-line"></div>
							<div class="support-title">商家公告</div>
							<div class="support-line"></div>
						</div>
						<div class="bulletin-content-detail">
							{{seller.bulletin}}
						</div>
					</div>
				</div>
				<!-- stick footer -->
				<!-- 关闭按钮 -->
				<div class="detail-footer" @click="closeDetail">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import star from '../star/star';
	import support from '../support/support';
	export default {
		name: 'header',
		components: { star, support },
		props: ['seller'],
		methods: {
			getIconByType: function (type) {
				var classList = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
				return classList[type];
			},
			showDetail: function () {
				this.detailShow = true;
			},
			closeDetail: function () {
				this.detailShow = false;
			}
		},
		data: function () {
			return {
				detailShow: false
			};
		}
	};
</script>

<style lang="less" rel="stylesheet/less">
	.header	{
		color:#fff;
		overflow: hidden;
		position: relative;
		background:rgba(7,17,27,0.5); 
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

	.support-content {
		font-size: 14px;
		color:rgb(255,255,255);
		font-weight: 200;
		line-height: 14px;
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

	.background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		filter:blur(10px);
	}
	.bulletin-wrapper {
		position: relative;
		// width:100%;
		height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow:ellipsis;
		-o-text-overflow:ellipsis;
		-webkit-text-overflow:ellipsis;
		-moz-text-overflow:ellipsis;
		vertical-align: top;
		background: rgba(7,17,27,0.2);
	}
	.bulletin-wrapper .icon-keyboard_arrow_right {
		position: absolute;
		right: 12px;
		top:8px;
		font-size: 10px;
		vertical-align: top;
	}
	.bulletin-icon {
		display:inline-block;
		background-image: url('bulletin@2x.png');
		width:22px;
		height: 12px;
		-moz-background-size:100% 100%;
		background-size:100% 100%;
		-webkit-background-size:100% 100%;
		vertical-align: top;
		margin-top: 8px;
	}
	.bulletin-content {
		font-size: 10px;
		color:rgb(255,255,255);
		font-weight: 200;
		line-height: 28px;
	}

	.detail {
		position: fixed;
		z-index: 100;
		height: 100%;
		width: 100%;
		left:0;
		top:0;
		background: rgba(7,17,27,0.8);
		overflow: auto;
		backdrop-filter:blur(10px);
	}

	.detail-wrapper {
		min-height: 100%;
		width:100%;
		overflow: auto;
	}

	.detail-content {
		margin-top: 64px;
		padding-bottom:64px;
	}
	.detail-footer {
		position: relative;
		width: 32px;
		height: 32px;
		margin: -64px auto 0 auto;
		clear:both;
		font-size: 32px;
	}
	.detail-name {
		height: 16px;
		font-size: 16px;
		font-weight: 700;
		color:rgb(255,255,255);
		line-height: 16px;
		text-align: center;
	}
	.star-wrapper {
		text-align: center;
		margin: 16px auto 28px auto;
		padding:2px 0;
	}
	.detail-support {
		width:80%;
		display: flex;
		margin: 0 auto 24px auto;
		.support-line {
			flex:1;
			position: relative;
			top:-6px;
			border-bottom: rgba(255,255,255,0.2) 1px solid;
		}
		.support-title {
			padding: 0 12px;
			font-size: 14px;
			font-weight: 700;
		}
	}
	.support-content-detail {
		font-size: 10px;
		color:rgb(255,255,255);
		font-weight: 200;
		line-height: 12px;
		vertical-align: top;
		width:80%;
		margin: 0 auto 28px auto;
	}
	.support-li {
		margin-bottom: 15px;
	}
	.bulletin-content-detail {
		width:80%;
		margin: 0 auto;
		padding: 0 12px 0 12px;
		font-size: 12px;
		font-weight: 200;
		line-height: 24px;
		color:rgb(255,255,255);
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
		opacity: 0
	}
</style>

