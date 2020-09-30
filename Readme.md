# Agile Poker app.

Server side Nodejs, application - React + typescript.

Usage of Node.js + Javascript because of development speed. Backend will be ported on Python in future.

## Start

Start server:

```javascript
  cd server
  yarn start
```

Start application:

```javascript
  cd app
  yarn start
```

## Roadmap

### Version 1. Base
* flip cards on button press (moderator)
* timer of vote in app
* vote time in Voting model
* give moderator role to user
* all state management to Redux
* localUserId to redux
* ~~some kind of api~~
* fix: reset on voting end (now page reloads, this is bad)
* ~~stop voting when all connected users voted~~
* ~~share results on vote stop~~
* ~~get story points based on users votes~~
* ~~clear user votes on button press (moderator)~~
* ~~close votes on button press (moderator)~~
* ~~skip story on button press (moderator)~~
* ~~multiple add stories~~
* ~~give moderator role to self~~
* ~~use react-redux~~

### Version 2. Jira integration
* ~~get epics list~~
* ~~check epics to import~~
* ~~import epic issues to your db~~
* set storypoints to jira issue after voting ended

### Version 3. Multiuser
* Register screen
* Registered users are moderators by default
* Rooms with unique ids
* Users have free access to rooms by link, need only name