var JS9Prefs = {
  "globalOpts": {
    "helperType": "none",
    "helperPort": 2718,
    "helperCGI": "./cgi-bin/js9/js9Helper.cgi",
    "fits2png": false,
    "debug": 0,
    "loadProxy": true,
    "workDir": "./tmp",
    "workDirQuota": 100,
    "dataPath": "$HOME/Desktop:$HOME/data",
    "analysisPlugins": "./analysis-plugins",
    "analysisWrappers": "./analysis-wrappers",

    // DWD-ADDED
    // If you do NOT specify installDir, then the path to contents of js9-served
    // will be determined dynamically based on the location of the js9.css file,
    // which we load in `index.html`
    // "installDir": "/assets/js9-served"
  },
  "imageOpts": {
    "colormap": "grey",
    "scale": "linear"
  }
};
