var test = require('tape')
var search = require('./')

var categoryWhitelist = [
	'anime',
	'applications',
	'books',
	'games',
	'movies',
	'music',
	'other',
	'tv',
	'video',
	'xxx'
]

test(function (t) {

	search('ubuntu').then(function(torrents) {
		console.log(torrents.length)

		t.equal(torrents.length, 30)

		var previousSeeders = Infinity

		torrents.forEach(function (torrent) {
			t.equal(typeof torrent.name, 'string', 'The torrent name is a string')
			t.notEqual(torrent.name.length, '', 'non-empty string')

			t.equal(typeof torrent.size, 'string', 'The torrent size is a string')
			t.notEqual(torrent.size.length, '', 'non-empty string')

			t.equal(typeof torrent.age, 'string', 'The torrent age is a string')
			t.notEqual(torrent.age.length, '', 'non-empty string')

			t.equal(typeof torrent.seeds, 'number', 'The seeds count is a number')
			t.ok(torrent.seeds >= 0, 'positive number')
			t.ok(torrent.seeds <= previousSeeders, 'Ordered by seeder count')
			previousSeeders = torrent.seeds

			t.equal(typeof torrent.leech, 'number', 'The leech count is a number')
			t.ok(torrent.leech >= 0, 'positive number')

			t.equal(typeof torrent.category, 'string', 'The torrent category is a string')
			console.log('category: ' + torrent.category)
			t.notEqual(categoryWhitelist.indexOf(torrent.category.toLowerCase()), -1, 'The cagegory is an expected category')

			t.equal(typeof torrent.magnet, 'string', 'The torrent magnet is a string')
			t.equal(torrent.magnet.slice(0, 20), 'magnet:?xt=urn:btih:', 'looks like a magnet link')

			t.equal(typeof torrent.torrent, 'string', 'The torrent link is a string')
			t.equal(torrent.torrent.slice(0, 19), 'https://kickass.cd/', 'looks like an https link')
		})

		t.end()
	}, function (err) {
		t.ifError(err)
	})
})
