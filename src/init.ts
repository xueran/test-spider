import {fetchData} from './fetch-data';
import {htmlParser} from './html-parser';
import {Data} from './data';
import {info, error} from './logging';

interface ProcessOptions{}

export async function init(options?: ProcessOptions) {
    // 数据模块初始化
    const data = new Data();

    let htmlContent: string = await fetchData();
    let itemsList: Array<string> = htmlParser(htmlContent);
    let newTexts: string = data.getDiff(itemsList);

    if (newTexts) {
        data.restore(newTexts);
    }
}
