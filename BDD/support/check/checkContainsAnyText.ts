import type { Selector } from 'webdriverio';
import * as data from '../../locators/common.json';

/**
 * Check if the given elements contains text
 * @param  {String}   elementType   Element type (element or button)
 * @param  {String}   selector       Element selector
 * @param  {String}   falseCase     Whether to check if the content contains
 *                                  text or not
 */
export default (
    elementType: 'element' | 'button',
    selector: string,
    falseCase?: any
) => {
    /**
     * The command to perform on the browser object
     * @type {String}
     */
    let command: 'getValue' | 'getText' = 'getValue';

    const elem = (<any>data)[selector];
    console.log("Element is : " + elem)

    if (
        elementType === 'button'
        || $(elem).getAttribute('value') === null
    ) {
        command = 'getText';
    }

    /**
     * False case
     * @type {Boolean}
     */
    let boolFalseCase;

    /**
     * The text of the element
     * @type {String}
     */
    const text = $(elem)[command]();

    if (typeof falseCase === 'undefined') {
        boolFalseCase = false;
    } else {
        boolFalseCase = Boolean(falseCase);
    }

    if (boolFalseCase) {
        expect(text).toBe('');
    } else {
        expect(text).not.toBe('');
    }
};
