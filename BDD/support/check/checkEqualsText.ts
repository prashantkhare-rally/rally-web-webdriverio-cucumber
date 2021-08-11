import type { Selector } from 'webdriverio';
import * as data from '../../locators/common.json';

/**
 * Check if the given elements text is the same as the given text
 * @param  {String}   elementType   Element type (element or button)
 * @param  {String}   selector      Element selector
 * @param  {String}   falseCase     Whether to check if the content equals the
 *                                  given text or not
 * @param  {String}   expectedText  The text to validate against
 */
export default (
    elementType: 'element' | 'button',
    selector: string,
    falseCase: boolean,
    expectedText: string
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

    /**
     * The expected text to validate against
     * @type {String}
     */
    let parsedExpectedText = expectedText;

    /**
     * Whether to check if the content equals the given text or not
     * @type {Boolean}
     */
    let boolFalseCase = !!falseCase;

    // Check for empty element
    if (typeof parsedExpectedText === 'function') {
        parsedExpectedText = '';

        boolFalseCase = !boolFalseCase;
    }

    if (parsedExpectedText === undefined && falseCase === undefined) {
        parsedExpectedText = '';
        boolFalseCase = true;
    }

    const text = $(elem)[command]();

    if (boolFalseCase) {
        expect(parsedExpectedText).not.toBe(text);
    } else {
        expect(parsedExpectedText).toBe(text);
    }
};
