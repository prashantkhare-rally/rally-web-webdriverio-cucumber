import type { Selector } from 'webdriverio';
import * as data from '../../locators/common.json';

/**
 * Check the selected state of the given element
 * @param  {String}   selector   Element selector
 * @param  {String}   falseCase Whether to check if the element is elected or
 *                              not
 */
export default (selector: string, falseCase: boolean) => {
    /**
     * The selected state
     * @type {Boolean}
     */

    const elem = (<any>data)[selector];
    console.log("Element is : " + elem)

    const isSelected = $(elem).isSelected();

    if (falseCase) {
        expect(isSelected)
            // @ts-expect-error
            .not.toEqual(true, `"${elem}" should not be selected`);
    } else {
        expect(isSelected)
            // @ts-expect-error
            .toEqual(true, `"${elem}" should be selected`);
    }
};
