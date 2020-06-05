module.exports.groupBy = (list, groupBy) => {
  return list.reduce((grouping, item) => {
    grouping[item[groupBy]] = grouping[item[groupBy]]
      ? grouping[item[groupBy]].concat(item)
      : [item];
    return grouping;
  }, {});
};

module.exports.keyBy = (list, keyBy) => {
  return list.reduce((output, item) => {
    output[item[keyBy]] = item;
    return output;
  }, {});
};
