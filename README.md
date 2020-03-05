# CATCH GUI

## What's the `CATCH GUI`?

This is the presentation tool for the [CATCH APIs](https://github.com/dwd-umd/catch-apis) developed by the [SBN Group](https://pds-smallbodies.astro.umd.edu/) at the University of Maryland.

## Quick Start

Everything you need to operate this repo can be found in a bash script beginning with `_`. E.g., you'd run `./_dev_client` to start developing the angular app.

### Essentials

- `git clone https://github.com/dwd-umd/catch-gui.git; cd catch-gui; npm i`
- `cp .env-template .env` and edit the contents of `.env` in order to set unique names, passwords, endpoints, etc. for your app.

### Develop App Locally

- `./_dev_client` to start dev server at `http://localhost:4200`

### Provision AWS S3, Cloudfront and Lambda-Emailer Service

- Install `terraform` on your system. (Use homebrew on a Mac: `brew install terraform`).

- `./_run_terraform` to provision/update AWS resources.

### Deploy App

#### Build and run locally

- Run `./_build_client` to build local bundle at `dist-local`

- Run `dist-local` with local http server; e.g. `npm i -g http-server; cd dist-local; http-server` and open in port specified by `http-server`

#### Deploy to github pages

- Configure your cloned repo to a remote repo at github (with github username and repo set in `.env`)
- `./_deploy_github_pages` to deploy to pages for github repo

#### Versioned Linux Deployment

- In a remote create a dir (that you do not need sudo permissions for) soft-linked to `catch-gui` in the document root of e.g. an apache server
- Run `./_deploy_versioned_linux abc` to deploy to `http://yourdomain.com/catch-gui/abc`

#### Deploy to AWS

- `./_build_client` followed by `./_deploy_aws`.

## Issues And Things to Improve

- Previously we had used angular animations but these proved so finicky that I removed them entirely in favor of pure js/css animations form first principles

- Look into SSR with e.g. Angular Universal

- Improve ngrx; move from class-based action creators to ngrx-provided createAction function; see [here](https://medium.com/angular-in-depth/ngrx-action-creators-redesigned-d396960e46da)

- matTooltip isn't working :( Need it in settings.

- Consider get column labels/descriptions at build time

- JQueryStatic type not working :(

## Developer Notes

### What's This?

This section is supposed to bring a developer up to speed with the layout of this repo.

### Quick Overview

This is an angular app with scripts that enable it to be deployed to github pages, a linux server, and AWS S3 buckets with (AWS cloudfront in front of the 'prod' S3 bucket). Also provisioned through AWS is an endpoint for sending emails (to be used for contact forms and urgent error messaging.)

Just about everything you need for operating this repo is written up in a bash script. All such bash scripts begin with underscore `_`.

The AWS resources are provisioned through terraform modules.

The angular app has the following features:

- PWA capabilities (for caching resources and API requests, installing to mobile homescreen)
- Angular Material styling (with dark and light themes)
- ngrx for state management

### NGRX

Why ngrx?

Frontend applications face two broad concerns: state management and presentation. For example, if you want to display a list of comments on a feed, then you need to first update a list in your javascript, then you need to use that list to tell your browser how to render a visual series of posts.

The major frontend frameworks to have emerged (angular, react and vue) all follow the "reactive paradigm". This is, roughly, the idea that your code focuses first on establishing the data's "state" and that the presentation of the app "flows" in a "one-way direction" from that state. Updating your state triggers (automatically) the updating of your presentation.

So, the name of the game is to keep your state super neat/organized and for the code controlling state to be as separated as possible from the code determiniing presentation. Long story short, you want a code structure that "centralizes" all your state, and that is designed to reflect the events-based nature of a user interface. Long sotry short, this is what ngrx gives you.

If you're new to ngrx (and 'redux' more generally), then go ...

[!](https://miro.medium.com/max/1200/1*qGx1vqtm-2U_T8Vn0cdzmA.gif)

[needs finishing]
