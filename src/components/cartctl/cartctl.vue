<template>
	<div class="cartctrl">
		<transition name="tran-de">
			<div v-show="showDecrease" class="decrease" @click="cartDecrease($event)">
				<i class="icon-remove_circle_outline"></i>
			</div>
		</transition>
		<transition name="tran-de">
			<div class="cnt" v-show="showDecrease">{{food.cnt}}</div>
		</transition>
		<div class="add" @click.stop.prevent="cartAdd($event)">
			<i class="icon-add_circle"></i>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['food'],
		methods: {
			cartAdd: function (event) {
				if (!event._constructed) {
					return;
				}
				if (this.food.cnt) {
					this.food.cnt ++;
				} else {
					this.$set(this.food, 'cnt', 1);
				}
				this.$emit('cartadd', event.target);
			},
			cartDecrease: function (event) {
				if (!event._constructed) {
					return;
				}
				this.food.cnt --;
			}
		},
		computed: {
			showDecrease: function () {
				if (this.food.cnt && this.food.cnt > 0) {
					return true;
				} else {
					return false;
				}
			}
		}
	};
</script>
<style lang="less">
	.tran-de-enter-active, .tran-de-leave-active {
		transition: opacity .5s
	}
	.tran-de-enter, .tran-de-leave-active {
		opacity: 0
	}
	.cartctrl {
		height: 24px;
		display: inline-block;
		font-size: 0px;
		.decrease {
			display: inline-block;
			padding: 2px;
			cursor:pointer;
		}
		.cnt {
			display: inline-block;
			width:8px;
			text-align: center;
			font-size: 10px;
			color:rgb(147,153,159);
			line-height: 24px;
			height: 24px;
			vertical-align: top;
			padding:2px;
		}
		.add {
			display: inline-block;
			padding:2px;
			cursor:pointer;
		}
	}
</style>
