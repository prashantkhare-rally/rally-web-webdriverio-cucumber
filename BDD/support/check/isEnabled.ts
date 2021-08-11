import type { Selector } from 'webdriverio';
import * as data from '../../locators/common.json';

/**
 * Check if the given selector is enabled
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Whether to check if the given selector
 *                              is enabled or not
 */
export default (selector: string, falseCase: boolean) => {
    /**
     * The enabled state of the given selector
     * @type {Boolean}
     */
    const elem = (<any>data)[selector];
    console.log("Element is : " + elem)

    const isEnabled = $(elem).isEnabled();

    if (falseCase) {
        expect(isEnabled).not.toEqual(
            true,
            // @ts-expect-error
            `Expected element "${elem}" not to be enabled`
        );
    } else {
        expect(isEnabled).toEqual(
            true,
            // @ts-expect-error
            `Expected element "${elem}" to be enabled`
        );
    }
};
