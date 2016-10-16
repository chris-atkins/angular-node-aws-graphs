'use strict';

describe('The Home Page', function() {

  it('should be redirected to when location hash/fragment is empty', function() {
    browser.get('');
    expect(browser.getLocationAbsUrl()).toMatch('/home');
  });
  
  describe('content', function() {

	  beforeAll(function() {
		  browser.get('/#/home');
	  });

	  it('has a title', function() {
		  var pageTitle = element(by.id('page-title'));
		  expect(pageTitle.getText()).toBe('Prototype');
	  });
	  
	  it('has a greeting message', function() {
		  var greetingMessage = element(by.id('home-message'));
		  expect(greetingMessage.getText()).toBe('Select Data Analysis Type');
	  });
  });
  
  describe('has navigation buttons:', function() {
	  
	  beforeEach(function() {
		  browser.get('/#/home');
	  });

	  it('has a Search Recipes button that navigates to the search screen', function() {
		  var searchButton = element(by.id('topic-correlations-button'));
		  expect(searchButton.getText()).toBe('Topic Correlations');
		  searchButton.click();
		  expect(browser.getLocationAbsUrl()).toMatch('/topic-correlations');
	  });
  });
});