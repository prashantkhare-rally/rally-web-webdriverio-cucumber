import type { Selector } from 'webdriverio';
import * as data from '../../locators/common.json';
import checkIfElementExists from '../lib/checkIfElementExists';


/**
 * Get the text of the given element
 * @param  {String}   elementType   Element type (element or button)
 * @param  {String}   selector      Element selector
 * @param  {String}   falseCase     Whether to check if the content equals the
 *                                  given text or not
 * @param  {String}   expectedText  The text to validate against
 */
export default async (
    elementType: 'element' | 'button',
    selector: string
) => {
    /**
     * The command to execute on the browser object
     * @type {String}
     */
    let command: 'getText' | 'getValue' = 'getValue';

    const elem = (<any>data)[selector];
    console.log("Element is : " + elem)

    if (
        elementType === 'button'
        || $(elem).getAttribute('value') === null
    ) {
        command = 'getText';
    }

    return new Promise((resolve,reject) => {
        checkIfElementExists(elem);
        resolve($(elem)[command])
    });

    // let actText = await Promise.all([checkIfElementExists(elem), $(elem)[command]()]);

    // console.log("Actual text is : " + actText);


    // return actText;

};
