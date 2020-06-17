/**
 * @file 解析html内容
 */

import { JSDOM } from 'jsdom';

export function htmlParser(htmlContent: string): Array<string> {
    const dom = new JSDOM(htmlContent);
    const items: NodeList = dom.window.document.querySelectorAll(".item-id");
    const itemsArr: Array<HTMLElement> = Array.prototype.slice.call(items);

    let idLists: Array<string> = [];
    itemsArr.forEach(item => {
        idLists.push(item.textContent);
    });
    return idLists;
}
