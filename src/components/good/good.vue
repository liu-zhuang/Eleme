<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li v-for="good in goods" class="menuItem">
					<span class="text"><support v-show="good.type>0" :supportType="good.type" :iconSize="3"></support>{{good.name}}</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper"></div>
	</div>
</template>
<script>
	import support from '../support/support';
	export default{
		props: ['seller'],
		components: { support },
		data: function () {
			return {
				goods: []
			};
		},
		mounted: function () {
			this.$nextTick(function () {
				var urlGoods = '/api/goods';
				this.axios.get(urlGoods)
				.then(res => {
					if (res.data.errno === 0) {
						this.goods = res.data.data;
					}
				})
				.catch(function () {
					console.log('get goods occur error...');
				});
			});
		}
	};
</script>
<style lang='less'>
	.goods {
		position: absolute;
		display: flex;
		top:176px;
		bottom:46px;
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
				margin: 0 12px;
				height: 54px;
				vertical-align: middle;
				line-height: 14px;
				border-bottom: solid 1px rgba(7,17,27,0.1);
				
			}
		}
		.goods-content {
			flex: 1;

		}
	}
	
</style>
