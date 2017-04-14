var got = require('got')
var url = require('url')
var cheerio = require('cheerio')

var origin = 'https://kickass.cd'

module.exports = function search(query) {
	var path = '/usearch/' + encodeURIComponent(query) + '/'

	return get(origin, path, 1)
}

function get(origin, path, tryCount) {
	return got(origin + path).then(function(response) {
		var body = response.body.toString()

		var $ = cheerio.load(body)

		var tableRows = $('table#mainSearchTable table tr')

		var torrents = tableRows
			.slice(1)
			.map(function(i, tableRow) {
				var row = $(tableRow)
				return {
					name: row.find('.cellMainLink').text(),
					category: row.find('.cellMainLink + span strong').text(),
					size: $(row.children()[1]).text(),
					age: $(row.children()[2]).text(),
					seeds: Number($(row.children()[3]).text()),
					leech: Number($(row.children()[4]).text()),
					magnet: row.find('a[title="Torrent magnet link"]').attr('href'),
					torrent: url.resolve(origin, row.find('.cellMainLink').attr('href'))
				}
			})
			.get()

		if (!torrents.length && tryCount < 3) {
			// Sometimes kat will return an empty table, when there are results
			return get(origin, path, tryCount + 1)
		}

		return torrents
	})
}
