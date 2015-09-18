var fleschKincaid = require('flesch-kincaid');
var syllable = require('syllable');
var tokenize = require('./node_modules/rousseau/lib/en/english').sentences();

module.exports = (text, opts) => {
  
  // From Rousseau
  var WORD_BOUNDARY_CHARS = '\t\r\n\u00A0 !\"#$%&()*+,\-.\\/:;<=>?@\[\\\]^_`{|}~';
  var WORD_BOUNDARY_REGEX = new RegExp('[' + WORD_BOUNDARY_CHARS + ']');
  var SPLIT_REGEX = new RegExp(
      '([^' + WORD_BOUNDARY_CHARS + ']+)');
  
  opts = opts || { level: 12 };
  
  // Cut text into sentences
  var sentences = tokenize(text);
  var suggestions = sentences.map(sentence => {
    
    // Calculate the FK score of each sentence.
    var fk = fleschKincaid({
      sentence: 1,
      word: sentence.value.split(WORD_BOUNDARY_REGEX).length,
      syllable: syllable(sentence.value)
    });
    
    // Return a suggestion if it's over the specified FK level.    
    return fk > opts.level ? {
      reason: `has a Flesch-Kincaid readibility score is ${ fk.toFixed(3) }`,
      index: sentence.index,
      offset: sentence.index + sentence.offset
    } : null;
    
  // Filter out okay sentences.
  }).filter(suggestion => {
    return suggestion !== null;
  });
  
  return suggestions;
};

