# JS9 Integration

## Overview

The JS9 scripts can be divided into two groups: \`js9-served\`, \`js9-compiled\`.

When it comes time to use JS9 in your angular app, there needs to be a JS9 global object, which is defined in \`js9.modified.min.js\`. If you want to compile \`js9.modified.min.js\` into a bundle, then it will need the following files in the same dir at build time: \`js9support.min.js, js9prefs.js, js9plugins.js\`. These four files are therefore placed in dir \`js9-compiled\`. For now, I am compiling these files at build time in \`angular.json\`, so they get loaded on first-page load. (Compressed, they only take up ~10k).

At run time, the \`JS9\` object has methods that are called to load up the fits file, etc. These methods will call out to further files, which can be found in \`js9-served\`.

## Note on Paths

One thing that really confused me for a while was the apparent need to load the JS9 CSS files in the \`index.html\`, otherwise the files called at run time would be called from the incorrect route. This is because, by default, JS9 will look for the location where the CSS file was loaded, and use that info as an expectation to find the js files. (This logic is in \`js9.js\`.)

To explicitly set the route to look for the js files, you can add an entry to the \`js9prefs.js\` file. I tried this at first, but then realized that the css apporach is actually a pretty handy way to do things since my deployments have varying base_href values. I therefore reverted to depending on the location of `js9.css`, as determined dynamically in my `index.html` file.
