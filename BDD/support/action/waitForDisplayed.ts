import type { Selector } from 'webdriverio';
import * as data from '../../locators/common.json';
import checkIfElementExists from '../lib/checkIfElementExists';

/**
 * Wait for the given element to become visible
 * @param  {String}   selector      Element selector
 * @param  {String}   falseCase     Whether or not to expect a visible or hidden state
 *
 * @todo  merge with waitfor
 */
export default async (selector: string, falseCase: any) => {
    /**
     * Maximum number of milliseconds to wait for
     * @type {Int}
     */
    const ms = 10000;

    const elem = (<any>data)[selector];
    console.log("Element is : " + elem)

    await Promise.all([checkIfElementExists(elem), $(elem).waitForDisplayed({
        timeout: ms,
        reverse: Boolean(falseCase),
    })]);

};
