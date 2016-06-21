/**
 * Created by dcreey on 6/3/2016.
 * Modified version of MEAN.io home.spec.js
 */

describe('Smoke test landing page', function(){
    it('title should contain app', function(){
        browser.get('/');
        expect(browser.getTitle()).toEqual('My App');
    });
});
