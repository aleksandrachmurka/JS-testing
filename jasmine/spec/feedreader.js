 //ensure that DOM is ready
$(function() {

    // test suite checking the RSS feeds definition and name
    describe('RSS Feeds', function() {

        //allFeeds are defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // each feed has defined and non-empty URL property
        it('all feed URLs are defined and not empty', function (){
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // each feed has defined and non-empty name property
        it('all feed names are defined and not empty', function (){
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    //test suite for the menu
    describe('The menu', function(){

        // menu is hidden by default
        let body = $('body');
        let menuIcon = $('.menu-icon-link');

        it('should be hidden by default', function(){
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        // click enables to toggle visibility of the menu
        it('menu changes visibility when menu icon is clicked', function(){
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

    });

    // test suite for feed entries
    describe('Initial entries', function(){

        // there is at least one item in feed container after feeds are loaded
        let entry;

        beforeEach(function(done) {
            loadFeed(0, function(){
	            entry = $('.feed .entry');
	            done();
	        });
        });

        it('has at least one entry', function() {
            expect(entry.length).toBeGreaterThan(0);
        });

    });

    // test suite for feed content
    describe('New Feed Selection', function(){

 		//loading of the new feed updates the content
        let container = $('.feed');
        let initialContent;
        let changedContent;

        beforeEach(function(done) {
            loadFeed(0, function() {
                initialContent = container.text();

                loadFeed(1, function(){
                    changedContent = container.text();
                    done();
                });
            });
        });

        it('content changes', function() {
            expect(initialContent).not.toBe(changedContent);
        });

    });

}());