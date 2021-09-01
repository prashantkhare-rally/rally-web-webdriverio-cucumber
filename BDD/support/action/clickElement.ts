import { Selector } from 'webdriverio';

import checkIfElementExists from '../lib/checkIfElementExists';
import * as data from '../../locators/common.json';

/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   selector Element selector
 */
export default async (
    action: 'click' | 'doubleClick',
    type: 'link' | 'selector',
    selector: string,
    contains?: string
) => {
    /**
     * Element to perform the action on
     * @type {String}
     */
    let elem;
    if (!contains)
    {
        elem = (<any>data)[selector];
        console.log("Element is : " + elem);
    }
    else
    {
        // elem = "//a[normalize-space()=" + contains;
        elem = `//a[normalize-space()="${contains}"]`;
        console.log("Contains is : " + elem);
    }


    /**
     * The method to call on the browser object
     * @type {String}
     */
    const method = (action === 'click') ? 'click' : 'doubleClick';

    await Promise.all([checkIfElementExists(elem), $(elem)[method]()]);
    
};