import { Selector } from 'webdriverio';
import * as data from '../../locators/common.json';
import checkIfElementExists from '../lib/checkIfElementExists';


/**
 * Clear a given input field (placeholder for WDIO's clearElement)
 * @param  {String}   selector Element selector
 */
export default async (selector: string) => {

    const elem = (<any>data)[selector];
    console.log("Element is : " + elem)

    await Promise.all([checkIfElementExists(elem), $(elem).clearValue()]);
    
};
