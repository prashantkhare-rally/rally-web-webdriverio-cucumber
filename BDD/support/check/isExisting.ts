import type { Selector } from 'webdriverio';
import * as data from '../../locators/common.json';

/**
 * Check if the given element exists in the current DOM
 * @param  {String}   selector  Element selector
 * @param  {String}   falseCase Whether to check if the element exists or not
 */
export default (selector: string, falseCase: boolean) => {
    /**
     * Elements found in the DOM
     * @type {Object}
     */
    const elem = (<any>data)[selector];
    console.log("Element is : " + elem)

    const elements = $$(elem);

    if (falseCase) {
        expect(elements).toHaveLength(
            0,
            // @ts-expect-error
            `Expected element "${elem}" not to exist`
        );
    } else {
        expect(elements.length).toBeGreaterThan(
            0,
            // @ts-expect-error
            `Expected element "${elem}" to exist`
        );
    }
};
