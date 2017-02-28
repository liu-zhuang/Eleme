<template>
	<span :class="spanSize">
		<span class="icon" :class="bgImg"></span>
	</span>
</template>
<script>
	export default {
		props: {
			supportType: Number,
			iconSize: Number
		},
		computed: {
			spanSize: function () {
				return 'supportIcon-' + this.iconSize;
			},
			bgImg: function () {
				var classList = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
				return classList[this.supportType];
			}
		}
	};
</script>
<style lang='less'>
	.icon {
		display: inline-block;
		-moz-background-size:100% 100%;
		background-size:100% 100%;
		-webkit-background-size:100% 100%;
	}
	.size-12{
		width:12px;
		height:12px;
		display: inline-block;
	}
	.size-16{
		width:16px;
		height:16px;
		display: inline-block;
	}
	.supportIcon-1 {
		.decrease {
			.size-12;
			background-image: url("decrease_1@2x.png");
		}
		.discount {
			.size-12;
			background-image: url("discount_1@2x.png");
		}
		.guarantee {
			.size-12;
			background-image: url("guarantee_1@2x.png");
		}
		.invoice {
			.size-12;
			background-image: url("invoice_1@2x.png");
		}
		.special {
			.size-12;
			background-image: url("special_1@2x.png");
		}
	}

	.supportIcon-2 {
		.decrease {
			.size-16;
			background-image: url("decrease_2@2x.png");
		}
		.discount {
			.size-16;
			background-image: url("discount_2@2x.png");
		}
		.guarantee {
			.size-16;
			background-image: url("guarantee_2@2x.png");
		}
		.invoice {
			.size-16;
			background-image: url("invoice_2@2x.png");
		}
		.special {
			.size-16;
			background-image: url("special_2@2x.png");
		}
	}
	.supportIcon-3 {
		.decrease {
			.size-12;
			background-image: url("decrease_3@2x.png");
		}
		.discount {
			.size-12;
			background-image: url("discount_3@2x.png");
		}
		.guarantee {
			.size-12;
			background-image: url("guarantee_3@2x.png");
		}
		.invoice {
			.size-12;
			background-image: url("invoice_3@2x.png");
		}
		.special {
			.size-12;
			background-image: url("special_3@2x.png");
		}
	}

	.supportIcon-4 {
		.decrease {
			.size-16;
			background-image: url("decrease_4@2x.png");
		}
		.discount {
			.size-16;
			background-image: url("discount_4@2x.png");
		}
		.guarantee {
			.size-16;
			background-image: url("guarantee_4@2x.png");
		}
		.invoice {
			.size-16;
			background-image: url("invoice_4@2x.png");
		}
		.special {
			.size-16;
			background-image: url("special_4@2x.png");
		}
	}
</style>
