/**
 * @file 解析html内容
 */

import { JSDOM } from 'jsdom';

export function htmlParser(htmlContent: string): string[] {
    if (!htmlContent) return [];
    
    const dom = new JSDOM(htmlContent);
    const items: NodeList = dom.window.document.querySelectorAll(".item-id");
    const itemsArr: Array<HTMLElement> = Array.prototype.slice.call(items);

    let idLists = [];
    itemsArr.forEach(item => {
        idLists.push(item.textContent);
    });
    return idLists;
}
