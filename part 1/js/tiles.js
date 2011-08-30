var canvas,
    context,
    tileset,
	desiredFPS = 32, // Desired frames per second
    tileSize = 32, // Size in pixels of each tile (square tiles, so equal height and width)
    mapData = [], // This will hold the data of the map
    mapLayers = 2, // The number of layers per tile
    eventTimer, // This will hold the timer for the event loop
    tilesWide, // This will be calculated
    tilesHigh, // This will be calculated
    tilesetTilesPerRow, // Tiles per row on the tileset
    initializeMap, // This will be the map generation function
    eventTimer, // This will hold the timer object which repeatedly calls the event loop
    eventLoop; // This will be the event loop function

window.onload = function(){
    canvas = document.getElementById('tile-canvas');
    context = canvas.getContext('2d');
    tileset = new Image();
    tileset.src = 'images/tiles.gif';
    tileset.onload = function(){ 
		tilesWide = canvas.width / tileSize;
		tilesHigh = canvas.height / tileSize;
		tilesetTilesPerRow = tileset.width / tileSize;
		initializeMap(); // To be defined
		eventTimer = setInterval(eventLoop, 1000 / desiredFPS);
	};
}

initializeMap = function(){
    for (var y = 0; y < tilesHigh; y++){
        mapData[y] = [];
        for (var x = 0; x < tilesWide; x++){
            mapData[y][x] = [];  
            mapData[y][x][0] = 1; // Place a grass tile  
            if (Math.random() > 0.7) // Place a random scenery tile 30% of the time
                mapData[y][x][1] = Math.round(Math.random() * 3) + 2;
            else
                mapData[y][x][1] = 0;
        }
    }
};

eventLoop = function(){
    var x, y, l;
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (y = 0; y < tilesHigh; y++)
        for (x = 0; x < tilesWide; x++)
            for (l = 0; l < mapLayers; l++)
                context.drawImage(
                    tileset, // Tileset image
                    (mapData[y][x][l] % tilesetTilesPerRow) * tileSize, // Source X
                    Math.floor(mapData[y][x][l] / tilesetTilesPerRow) * tileSize, // Source Y
                    tileSize, // Source Width
                    tileSize, // Source Height
                    x * tileSize, // Destination X
                    y * tileSize,  // Destination Y
                    tileSize, // Destination Width
                    tileSize); // Destination Height
};