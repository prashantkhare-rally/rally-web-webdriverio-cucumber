import type { Selector } from 'webdriverio';
import * as data from '../../locators/common.json';

/**
 * Check if the given element is (not) visible
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Check for a visible or a hidden element
 */
export default (selector: string, falseCase: boolean) => {
    /**
     * Visible state of the give element
     * @type {String}
     */
    const elem = (<any>data)[selector];
    console.log("Element is : " + elem)

    const isDisplayed = $(elem).isDisplayed();

    if (falseCase) {
        expect(isDisplayed).not.toEqual(
            true,
            // @ts-expect-error
            `Expected element "${elem}" not to be displayed`
        );
    } else {
        expect(isDisplayed).toEqual(
            true,
            // @ts-expect-error
            `Expected element "${elem}" to be displayed`
        );
    }
};
