[I'm an inline-style link with title](https://www.somewebsite.com "somewebsite's Homepage")

# CATCH GUI DEVELOPMENT NOTES

## What's This?

Space to:

- Bring a developer up to speed in order to maintain/develop this app.

- Record todos, issues, design choices, etc. for the app.

### Quick Overview

This is an angular app with scripts that enable it to be deployed to github pages, a linux server, and AWS S3 buckets with (AWS cloudfront in front of the 'prod' S3 bucket). Also provisioned through AWS is an endpoint for sending emails (to be used for contact forms and/or urgent error messaging.)

Just about everything you need for operating this repo is written up in a bash script. All such bash scripts begin with underscore `_`.

The AWS resources are provisioned through terraform modules.

The angular app has the following features:

- PWA capabilities (for caching resources and API requests -- working offline, installing to mobile homescreen)
- Angular Material styling (with dark and light themes)
- ngrx for state management
- JS9 fits-viewer integration

### NGRX

Why ngrx?

I started out without ngrx, thinking that this app would, at most, become 'medium' sized, and therefore run fine with just angualr services. However, in working with this approach, I've come to conclude that refactoring an angular app without ngrx is awful, and that I will only ever NOT use ngrx in anangular app if I'm sure that it will only ever be an insanely simple app. (However, if the app is insanely simple, then it would probably be better set up with wordpress. In short, I intend to pretty much always use ngrx from hereon when using angular.)

If you're new to the world of redux/ngrx, then you've got a learning curve ahead of you I'm afraid. It involves some hefty upfront boilerplate, and things will feel slow/awkward for ~weeks. However, I assure you that if you embrace the world of rxjs then you'll come to see that it was worth it.

This repo uses the slightly older 'class-based' approach to creating actions. I think this will prove more digestible for new-comers. (The more modern approach is more abstract, and harder to grasp when starting out.)

![](https://miro.medium.com/max/1200/1*qGx1vqtm-2U_T8Vn0cdzmA.gif)
_Schematic of ngrx at work_

### TODOs

- Preserve component state with HMR. See [here](https://stackoverflow.com/questions/49595833/how-to-preserve-state-during-hmr-using-angular) and [here](https://github.com/PatrickJS/starter) to get started.

- Implement scully SSG

### Notes/Issues

- Support for HMR in angular apps is surprisingly poorly supported. The most officious guide I could find was [here](). I also consulted [this repo](https://github.com/kubk/angular-ngrx-hmr) to get basic HMR working with ngrx. However, this did not preserve component state. As of 2-25-20 component state is yet to be resolved.
