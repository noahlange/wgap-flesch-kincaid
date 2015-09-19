/* globals describe, it */

var expect = require('chai').expect;

describe('wgap-flesch-kincaid', function() {
  
  var fk = require('../index');
  var text = "Call me Ishmael. Some years ago -- never mind how long precisely -- having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen, and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off -- then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me."; // <3 U Hermy - NL
    
  describe('flesch-kincaid readability score calculation', function() {
    
    var suggestions = fk(text);
    
    it('should provide an array of readability issues', function() {
      expect(Array.isArray(suggestions)).to.be.true;
    });
  
    it('should provide the index of text with readability issues', function() {   
      expect(suggestions[0].index).to.equal(17);    
    });
    
    it('should provide the offset of text with readability issues', function() {   
      expect(suggestions[0].offset).to.equal(213);    
    });
  
    it('should provide a flesch-kincaid grade level', function() {
      expect(suggestions[0].reason).to.equal('has a Flesch-Kincaid grade level of 16.8');
    });
    
    it('should compare to a configurable reading level', function() {
      expect(fk(text, { level: 20 }).length).to.equal(1)
    });
    
  });
  
})