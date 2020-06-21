/**
 * @file 解析json内容
 */

interface Data {
    list: Array<string>;
    [key: string]: any;
}
export function jsonParser(data: string): Array<string> {
    if (!data) return [];
    let json: Data = JSON.parse(data);

    return json.list || [];
}
