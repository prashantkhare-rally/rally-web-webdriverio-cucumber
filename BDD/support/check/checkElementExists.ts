import type { Selector } from 'webdriverio';

import checkIfElementExists from '../lib/checkIfElementExists';
import * as data from '../../locators/common.json';

/**
 * Check if the given element exists
 * @param  {String}   isExisting Whether the element should be existing or not
 *                               (an or no)
 * @param  {String}   selector   Element selector
 */
export default (isExisting: string, selector: string) => {
    /**
     * Falsecase assertion
     * @type {Boolean}
     */
    let falseCase = true;

    if (isExisting === 'an') {
        falseCase = false;
    }

    const elem = (<any>data)[selector];
    console.log("Element is : " + elem)

    checkIfElementExists(elem, falseCase);
};
