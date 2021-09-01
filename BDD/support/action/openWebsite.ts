/**
 * Open the given URL
 * @param  {String}   type Type of navigation (getUrl or site)
 * @param  {String}   page The URL to navigate to
 */
import * as generic from '../../testdata/generic.json';

export default async (type: 'url' | 'site', page: string) => {
    /**
     * The URL to navigate to
     * @type {String}
     */

    let customUrl;

    if(page != "/")
    {
        customUrl = (<any>generic)[page];
        console.log("The launch url is: " + customUrl)
    } 


    const url = (type === 'url') ? customUrl : browser.options.baseUrl + page;
    console.log("The launch url is: " + url);
    await Promise.all([browser.url(url)]);
    // browser.url(url);
};
