# Write Good (as Promised) - Flesch Kincaid

[![Build Status](https://travis-ci.org/noahlange/wgap-flesch-kincaid.svg?branch=master)](https://travis-ci.org/noahlange/wgap-flesch-kincaid)
[![Coverage Status](https://coveralls.io/repos/noahlange/wgap-flesch-kincaid/badge.svg?branch=master&service=github)](https://coveralls.io/github/noahlange/wgap-flesch-kincaid?branch=master)

A Write-Good compatible checker for Flesch-Kincaid readibility for [Write-Good (as Promised)](https://github.com/noahlange/write-good-as-promised).
Uses [sentence-tokenizer](https://github.com/parmentf/node-sentence-tokenizer)
for its sentence tokenizing.

Written for [Prosely](https://github.com/noahlange/prosely), but it'll work just
fine for vanilla Write-Good.

## Use
```javascript
var fk = require('wgap-flesch-kincaid');
var text = `Call me Ishmael. Some years ago -- never mind how long precisely -- having little or no
 money in my purse, and nothing particular to interest me on shore, I thought I would sail about a 
 little and see the watery part of the world. It is a way I have of driving off the spleen, and 
 regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a 
 damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin 
 warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get 
 such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately 
 stepping into the street, and methodically knocking people's hats off -- then, I account it high time 
 to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical 
 flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising 
 in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly 
 the same feelings towards the ocean with me.`;

var suggestions = fk(text);
/* yields:
[ { reason: 'has a Flesch-Kincaid grade level of 16.8',
    index: 17,
    offset: 213 },
  { reason: 'has a Flesch-Kincaid grade level of 38.2',
    index: 309,
    offset: 496 } ]
*/

var fewerSuggestions = fk(text, { level: 18 });
/* yields: 
[ { reason: 'has a Flesch-Kincaid grade level of 38.2',
    index: 309,
    offset: 496 } ]
*/

```

## License
MIT