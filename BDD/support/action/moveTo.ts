import { Selector } from 'webdriverio';
import * as data from '../../locators/common.json';

/**
 * Move to the given selector with an optional offset on a X and Y position
 * @param  {String}   selector  Element selector
 * @param  {String}   x        X coordinate to move to
 * @param  {String}   y        Y coordinate to move to
 */
export default (selector: string) => {

    let elem = (<any>data)[selector];
    console.log("Element is : " + elem);

    $(elem).moveTo();
};