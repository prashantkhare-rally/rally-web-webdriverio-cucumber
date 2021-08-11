import { Selector } from 'webdriverio';
import * as data from '../../locators/common.json';
import checkIfElementExists from '../lib/checkIfElementExists';

/**
 * Select a option from a select element by it's index
 * @param  {String}   index      The index of the option
 * @param  {String}   obsolete   The ordinal indicator of the index (unused)
 * @param  {String}   selector Element selector
 *
 * @todo  merge with selectOption
 */
export default async (
    index: string,
    obsolete: never,
    selector: string
) => {
    /**
     * The index of the option to select
     * @type {Int}
     */
    const optionIndex = parseInt(index, 10);

    const elem = (<any>data)[selector];
    console.log("Element is : " + elem)

    await Promise.all([checkIfElementExists(elem), $(elem).selectByIndex(optionIndex)]);

};
