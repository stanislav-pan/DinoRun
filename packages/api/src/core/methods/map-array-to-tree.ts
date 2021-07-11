export const mapArrayToTree = (items, id = null, link = 'parentId') => {
  return items
    .filter((item) => item[link] === id)
    .map((item) => {
      const itemJSON = item.toJSON();

      return {
        ...itemJSON,
        children: mapArrayToTree(items, itemJSON.id),
      };
    });
};
