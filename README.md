# Search kat.cd

> Search kickass.cd

[![Build Status](https://travis-ci.org/ArtskydJ/search-kat.cd.svg?branch=master)](https://travis-ci.org/ArtskydJ/search-kat.cd)

## Example

```js
var search = require('search-kat.cd')

search('ubuntu').then(function (results) {
	results.forEach(function printListItem(result) {
		console.log(`- [${result.name}](${result.torrent})`)
	})
})
```

## API

**WARNING: Requires node.js 4 or higher**

```js
var search = require('search-kat.cd')
```

### `search( searchQuery ) => Promise( torrents )`

- `searchQuery` String, required - Search for torrents matching this search string. E.g. 'Ubuntu 16.04 64-bit'

Returns a `Promise` that resolves to an array of `torrent`s

### `torrent`

The `torrents` array holds up to 30 `torrent` objects, ordered by seeder count. (Most seeders in `torrents[0]`, fewest seeders in `torrents[29]`)

Each object has the following properties:

- `name` String, Name of torrent, E.g. `"Ubuntu 16.04.1 LTS Desktop 64-bit"`
- `category` String, Category it's in, E.g. `"Applications"`
- `size` String, Size of file, E.g. `"1.41 GiB"`
- `age` String, Age of result, E.g. `"08-06 2016"`
- `seeds` Number, Number of seeds, E.g. `78`
- `leech` Number, Number of leeches, E.g. `78`
- `magnet` String, Magnet link, E.g. `"magnet:?xt=urn:btih:9f9165d9a281a9b8e782cd5176bbcc8256fd1871&dn=Ubuntu..."`
- `torrent` String, Torrent URL, E.g. `"https://kickass.cd/ubuntu-16-04-1-lts-desktop-64-bit-tt15497321.html"`

## Install

	npm install search-kat.cd

## License

[MIT](https://choosealicense.com/licenses/mit/)