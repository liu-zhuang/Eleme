import Vue from 'vue';
import Router from 'vue-router';
import good from 'components/good/good';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
Vue.use(Router);

export default new Router({
	routes: [
	{ path: '/good', component: good },
	{ path: '/ratings', component: ratings },
	{ path: '/seller', component: seller }
	],
	linkActiveClass: 'active' // 构造属性
});
