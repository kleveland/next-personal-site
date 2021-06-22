const COLLECTION_ID: string = "19d7f583-b6a6-460d-9eb4-19c02a221c91";

export default (pageList: any) => {
  const data = pageList.recordMap;
  const schemaMap = data.collection[COLLECTION_ID].value.schema;
  const entries = Object.entries(data.block).filter((entry: any) => entry[1].value.properties).reverse().map((entry: any) => {

    const newEntry:any = {
          id: entry[0],
          title: entry[1].value.properties.title[0][0],
          imageLink: entry[1].value.format ? `https://www.notion.so/image/${encodeURIComponent(entry[1].value.format?.page_icon)}?table=block&id=${entry[0]}&cache=v2` : '/post_images/empty_image.svg'
      };
      Object.keys(entry[1].value.properties).forEach((key: string) => {
        const schema = schemaMap[key];
        if (schema.type === 'text') 
            newEntry[schemaMap[key].name] = entry[1].value.properties[key][0][0];
        else if (schema.type === 'multi_select')
            newEntry[schemaMap[key].name] = entry[1].value.properties[key][0][0].split(',');
        else if (schema.type === 'date')
            newEntry[schemaMap[key].name] = formatDate(entry[1].value.properties[key][0][1][0][1].start_date);
      });
      return newEntry;
  });

  return entries;
};

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
    
const formatDate = (input: string) => {
    const date = new Date(input)
    const month = date.getMonth()
    return `${months[month]} ${date.getDate()}, ${date.getFullYear()}`
}

