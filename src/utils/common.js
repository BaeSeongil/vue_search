export const moveScroll = (tag, behavior = "smooth", block = "start", inline = "nearest") => {
  const target = document.querySelector(tag);
  target.scrollIntoView({
    behavior,
    block,
    inline,
  });
};

export const searchTabs = (docjson, settingKey) => {
  const { tabs } = docjson;
  for (let tabNum = 0; tabNum < tabs.length; tabNum++) {
    for (let blockNum = 0; blockNum < tabs[tabNum].data.length; blockNum++) {
      for (
        let rowNum = 0;
        rowNum < tabs[tabNum].data[blockNum].block.length;
        rowNum++
      ) {
        for (
          let index = 0;
          index < tabs[tabNum].data[blockNum].block[rowNum].length;
          index++
        ) {
          const item = tabs[tabNum].data[blockNum].block[rowNum][index];
          if (item.setting === settingKey) {
            return item;
          }
        }
      }
    }
  }
  return null;
};

export const getLang = (lang, data) => {
  if (lang) {
    return lang;
  } else {
    return data;
  }
}
