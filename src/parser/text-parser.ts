/**
 * @file 解析文本内容
 */

export function textParser(data: string): string[] { 
    if (!data) return [];
    return data.split('\n');
}
