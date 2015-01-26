# [BeatSoup](http://www.beatsoup.me)

BeatSoup is a social music-streaming web app inspired by [SoundCloud](http://www.soundcloud.com), built primarily with Ruby on Rails and Backbone.js. 

## Features
- Single-page app (except user registration and login pages)
- Plays music (duh)
- Now-playing queue persists across a user's session, play is never interrupted by navigation around the site
- Users can follow other users, with "Stream" page showing followed users' uploaded tracks
- Users can create playlists and add/remove tracks to/from their own playlists
- Playlists can be "private," only visible to that user
- Users can leave comments on songs and can edit/delete their own comments
- Comments can be replies to previous comments
- Songs can be tagged arbitrarily, and users can search by these tags

## Technical Details
- Uses the HTML5 `<audio>` tag to play music
- Backbone.js frontend consumes a RESTful JSON API served by Rails backend, allowing the app to be single-page
- File upload and storage with Paperclip and Amazon AWS
- Implements a CompositeView prototype in Backbone to better modularize view code and avoid unnecessary re-renders
- Overrides Backbone.sync to better facilitate global error handling
- Tag search/add fields have autocomplete powered by jQuery UI widget

## TODO
- Custom player controls (CSS? HTML5 Canvas?)
- Make now-playing queue persist past user ending session
- User profiles
- Fix occasional server timeouts during file upload using delayed_job
- Improve error handling
- Reposting
- Pin comments to track times, SC-style
- Improve comment view in general
- Tidy up CSS
- Waveforms, mayyybe