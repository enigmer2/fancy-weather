const options = {
  // Required: API key
  key: "2EGrjPuE7U6PsUORrn5L5Bn9gpeuU1kC",

  // Put additional console output
  verbose: true,

  // Optional: Initial state of the map
  lat: 50.4,
  lon: 23.83,
  zoom: 5,
};

// Initialize Windy API
windyInit(options, (windyAPI) => {
  // windyAPI is ready, and contain 'map', 'store',
  // 'picker' and other usefull stuff

  const { map } = windyAPI;
});
