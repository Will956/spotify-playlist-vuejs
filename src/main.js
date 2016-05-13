/* eslint-disable no-new */
/* eslint-disable indent */
import Vue from 'vue'
import vueResource from 'vue-resource'
Vue.use(vueResource)
import SearchArtist from './components/SearchArtist'

new Vue({
	el: 'body',
	components: {
		searchartist: SearchArtist
	}
})
