import {fetchData} from './fetch-data';
import {parser} from './parser';
import {Data} from './data';
import {error, info} from './logging';

interface ProcessOptions{
    type: string;
}

export async function init(options: ProcessOptions) {
    let type: string = options.type;
    let content: string = await fetchData(type);
    let itemsList: Array<string> = parser(type, content);

    if (!itemsList.length) {
        error(`type = ${type} 解析数据失败`);
    }
    // 数据模块初始化
    const data = new Data();
    // 获取新增数据
    let newTexts: string = data.getDiff(itemsList);
    if (newTexts) {
        data.restore(newTexts);
    } else {
        info('没有发现新增数据');
    }
}
