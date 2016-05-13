<style>
	.col-md-12 input {
		margin: 15px;
	}
	.select-artist {
		cursor: pointer;
		font-weight: bold;
	}
	.btn {
		margin: 10px 5px;
	}
</style>

<template>
<div class="container">
	<div class="row">
		<div class="col-md-12 text-center">
			<input class="search-artist" type="text" list="choose-artist" placeholder="{{placeholder}}" v-model="artist">
		</div>
		<div class="col-md-12 text-center">
			<a class="btn btn-default" v-for="artist in artists" v-on:click="selectArtist(artist.id)" href="#">{{artist.name}}</a>
		</div>
	</div>
</div>
	<generateplaylist v-bind:artist-id="artistId"></generateplaylist>
</template>

<script>
import _ from 'underscore'
import GeneratePlaylist from './GeneratePlaylist'
/* eslint-disable indent */
/* eslint-disable no-undef */
export default {
	components: {
		generateplaylist: GeneratePlaylist
	},
	props: {
		placeholder: {type: String, default: 'Choose an artist'},
		artist: {type: String}
	},
	data: function () {
		return {
			artists: {},
			artistId: ''
		}
	},
	watch: {
		'artist': function (value) {
			(value.length > 2) ? this.getArtist(value) : this.artists = {}
		}
	},
	methods: {
		getArtist: function (artist) {
			var self = this
			self.$http.get('https://api.spotify.com/v1/search', {q: self.artist, type: 'artist', market: 'FR', limit: 3})
				.then(function (response) {
					self.artists = _.uniq(response.data.artists.items, function (item) {
						return item.name
					})
				})
		},
		selectArtist: function (id) {
			this.artistId = id
		}
	}
}

$(function () {
	$('.artist-infos').on('click', function (e) {
		$(this).fadeOut(400)
		$('.search-artist').fadeOut(400)
	})
})
</script>
