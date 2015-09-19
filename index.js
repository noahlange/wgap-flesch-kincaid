var fleschKincaid = require('flesch-kincaid');
var syllable = require('syllable');
var Tokenizer = require('sentence-tokenizer');

module.exports = (text, opts) => {
  
  opts = opts || { level: 12 };
  
  // Cut text into sentences
  
  var tokenizer = new Tokenizer('prosely');
      tokenizer.setEntry(text);

  var sentences = tokenizer.getSentences();
  var suggestions = sentences.map(sentence => {
    
    // Calculate the FK score of each sentence.
    var fk = fleschKincaid({
      sentence: 1,
      word: tokenizer.getTokens().length,
      syllable: syllable(sentence)
    });
    
    var index = text.indexOf(sentence);
    var offset = sentence.length;
    
    // Return a suggestion if it's over the specified FK level.    
    return fk > opts.level ? {
      reason: `has a Flesch-Kincaid readibility score is ${ fk.toFixed(3) }`,
      index: index,
      offset: offset
    } : null;
    
  // Filter out okay sentences.
  }).filter(suggestion => {
    return suggestion !== null;
  });
  
  return suggestions;
};

