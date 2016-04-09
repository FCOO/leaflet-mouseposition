# leaflet-mouseposition
>


## Description
Extension to leaflet to fire a new event `mouseposition` when the mouse is moved on the map **OR** when the map is moved *'under'* without moving the mouse on the screen. 
This happens e.q. when the map is being zoomed or panned using the keyboards

## Installation
### bower
`bower install https://github.com/FCOO/leaflet-mouseposition.git --save`

## Demo
http://FCOO.github.io/leaflet-mouseposition/demo/ 

## Usage
Add a `function( `[`MouseEvent`](http://leafletjs.com/reference.html#mouse-event) `)`and `context` (optional) to the event `mouseposition` using the normal [Leaflet event methods](http://leafletjs.com/reference.html#events)

	map.on('mouseposition', function( mouseEvent ){...} );

When the mouse is moved out of the map, the `mouseposition` event is fired with `mouseEvent.latlng = null`



## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/leaflet-mouseposition/LICENSE).

Copyright (c) 2015 [FCOO](https://github.com/FCOO)

## Contact information

[Niels Holt](https://github.com/NielsHolt)
