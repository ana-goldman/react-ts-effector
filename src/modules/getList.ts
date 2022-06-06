export const getList = (link: string | null, arrList:Array<string>) => {
  if (link) {
    const regex = /\d+/g;
    const string = link;
    const match:RegExpMatchArray | null = string.match(regex);
    if (match) return arrList.push(match[0])
  }
} 
