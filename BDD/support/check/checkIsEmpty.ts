import type { Selector } from 'webdriverio';

import checkContainsAnyText from './checkContainsAnyText';
import * as data from '../../locators/common.json';

export default (
    elementType: 'button' | 'element',
    element: string,
    falseCase: ' not'
) => {
    let newFalseCase = true;

    const elem = (<any>data)[element];
    console.log("Element is : " + elem)

    if (typeof falseCase === 'function') {
        newFalseCase = false;
    } else if (falseCase === ' not') {
        newFalseCase = false;
    }

    checkContainsAnyText(elementType, elem, newFalseCase);
};
