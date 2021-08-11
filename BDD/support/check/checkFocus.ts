import type { Selector } from 'webdriverio';
import * as data from '../../locators/common.json';

/**
 * Check if the given element has the focus
 * @param  {String}   selector  Element selector
 * @param  {String}   falseCase Whether to check if the given element has focus
 *                              or not
 */
export default (selector: string, falseCase: boolean) => {
    /**
     * Value of the hasFocus function for the given element
     * @type {Boolean}
     */

    const elem = (<any>data)[selector];
    console.log("Element is : " + elem)

    const hasFocus = $(elem).isFocused();

    if (falseCase) {
        expect(hasFocus).not.toBe(
            true,
            // @ts-expect-error
            'Expected element to not be focused, but it is'
        );
    } else {
        expect(hasFocus).toBe(
            true,
            // @ts-expect-error
            'Expected element to be focused, but it is not'
        );
    }
};
