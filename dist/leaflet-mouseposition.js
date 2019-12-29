/****************************************************************************
    leaflet-mouseposition.js,

    (c) 2016, FCOO

    https://github.com/FCOO/leaflet-mouseposition
    https://github.com/FCOO

****************************************************************************/
(function (L/*, window, document, undefined*/) {
    "use strict";

    function adjust( mouseEvent ){
        //Correct for -180 > longitude and longitude > 180
        var lng = mouseEvent.latlng.lng;
        lng = lng % 360;
        if (lng > 180)
            lng = lng - 360;
        else
            if (lng < -180)
                lng = lng + 360;
        mouseEvent.latlng.lng = lng;

        return mouseEvent;
    }

    function onMapMove( map ){
        if (map._mouseposition_mouseevent){
            var newLatlng = map.containerPointToLatLng( map._mouseposition_mouseevent.containerPoint );
            if ( !newLatlng.equals( map._mouseposition_mouseevent.latlng ) ){
              //The mouse is at a new position
                map._mouseposition_mouseevent.latlng = newLatlng;
                map.fire( 'mouseposition', adjust( map._mouseposition_mouseevent ) );
            }
        }
    }

    L.Map.addInitHook(function () {

        this._mouseposition_mouseevent = null;

        //Add mousemove-event
        this.on('mousemove', function( mouseEvent ){
            mouseEvent.type = 'mouseposition';

            this._mouseposition_mouseevent = adjust( mouseEvent );
            this.fireEvent( 'mouseposition', mouseEvent );
        }, this);

        //Add mouseout-event
        this.on('mouseout', function( mouseEvent ){
            this._mouseposition_mouseevent = null;
            mouseEvent.type = 'mouseposition';
            mouseEvent.latlng = null;
            this.fireEvent( 'mouseposition', mouseEvent );
        }, this);

        //Add zoomend-event
        this.on('moveend zoomend popupopen', function(){
            onMapMove( this );
        }, this);


    });

    //Extend L.Map.Keyboard.prototype._onKeyDown to fire 'mouseposition' on pan by keyboard
    L.Map.Keyboard.prototype._onKeyDown =
        function( _onKeyDown ){
            return function(){

                //Original method
                _onKeyDown.apply(this, arguments);

                //If the mouse is over the map
                onMapMove( this._map );

            };
        }( L.Map.Keyboard.prototype._onKeyDown );

}(L, this, document));
