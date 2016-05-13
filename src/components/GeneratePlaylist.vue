<template>
	<div class="container">
		<div class="row" v-if="playlist[0]">
			<div class="col-md-12 text-center">
				<iframe :src="'https://embed.spotify.com/?uri=spotify:trackset:Playlist+Generator:' + playlist.join()" height="380" frameborder="0" allowtransparency="true"></iframe>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="row" v-if="playlist[0]">
			<div class="col-md-12  text-center">
				<a class="btn btn-default" href="/">Retry</a>
			</div>
		</div>
	</div>
</template>

<script>
import _ from 'underscore'
/* eslint-disable indent */
export default {
	props: ['artistId'],
	data: function () {
		return {
			artists: {},
			tracks: [],
			playlist: []
		}
	},
	watch: {
		'artistId': function (value) {
			if (value) this.getArtistRelated(value)
		}
	},
	methods: {
		getArtistRelated: function (id) {
			var self = this
			self.playlist = []
			self.getArtistTopTracks(id, 6)
			self.$http.get(`https://api.spotify.com/v1/artists/${id}/related-artists`)
				.then(function (response) {
					self.artists = _.chain(response.data.artists)
									.shuffle()
									.rest(17)
									.value()
					_.each(self.artists, function (artist) {
						self.getArtistTopTracks(artist.id, 8)
					})
				})
		},
		getArtistTopTracks: function (id, restOfTracks) {
			var self = this
			self.$http.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=FR`)
				.then(function (response) {
					let temp = _.chain(response.data.tracks)
									.shuffle()
									.rest(restOfTracks)
									.value()
					_.each(temp, function (track) {
						self.playlist.push(track.id)
					})
					self.tracks.push(temp)
				})
		}
	}
}
</script>