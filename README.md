#writeBetter
This is a project I completed as a student at [Hack Reactor](http://hackreactor.com). This was my individual project completed in just two days.

## Usage

writeBetter is a web service where the user can check the correct usage of a certain word. The user simply types in a word or phrase and automatically gets a page full of quotes with the given word or phrase from one or more reputable websites.

See [PRESS-RELEASE.md](PRESS-RELEASE.md) for the description of use cases.

## Possible feature extensions

- the websites can be ranked according to their reputation and reliability.
- the websites can be categorized by context (news, sports, science, tech etc.)
- the user can select the required context, which will limit the search only to relevant websites. 

## Requirements

### Dependencies

Client
- jquery 2.0.3
- underscore 1.7.0
- bower 1.3.12

Server
- express 4.11.1
- body-parser 1.10.2
- cheerio 0.18.0
- request 2.49.0

### Installing Dependencies

To install npm modules:

from within the root directory

```sh
npm install
```
To install client-side dependencies

from within the client directory

```sh
sudo npm install -g bower  
bower install
```
