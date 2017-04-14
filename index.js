var got = require('got')
var url = require('url')
var cheerio = require('cheerio')

var origin = 'https://kickass.cd'

module.exports = function search(query) {
	var path = '/usearch/' + encodeURIComponent(query) + '/'

	return got(origin + path).then(function(response) {

		var $ = cheerio.load(response.body.toString())

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

		return torrents
	})
}
