import {fetchData} from './fetch-data';
import {htmlParser} from './html-parser';
import {Data} from './data';
import {info} from './logging';

interface ProcessOptions{}

export async function init(options?: ProcessOptions) {
    let htmlContent: string = await fetchData();
    let itemsList: Array<string> = htmlParser(htmlContent);
    const data = new Data();

    let newTexts: string = '';
    let count: number = 0;
    itemsList.forEach(id => {
        if (data.isNew(id)) { 
            newTexts += `${id}\n`;
            count++;
        }
    });

    if (count) {
        data.updateExist(newTexts);
        let ret:boolean = data.restore(newTexts);
        if (ret) {
            info(`发现了新增内容！${count}`);
        } else {
            info(`发现了新增内容！${count}，存储失败`);
        }
    } else {
        info('没有新增内容!');
    }
}
