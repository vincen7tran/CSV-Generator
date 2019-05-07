function CSVGenerator({data}) {
  const obj = convertData(data);
  const fields = [...extractFields(obj)];
  const extract = extractData(obj, fields)
  const csv = formatCSV(extract, fields);
  return csv;
};

function convertData(data) {
  const removeSpace = data.split(' ');
  let last = removeSpace[removeSpace.length - 1];
  // Remove Semicolon If Present
  if (last[last.length - 1] === ';') last = last.slice(0,1);
  return JSON.parse(removeSpace.join(''));
}

// TODO: Optimize to not check all children?
// Check Fields of first child and then check if any of the children have children
// Check Fields for 1 children per "layer"
function extractFields(obj) {
  const fields = new Set();
  (function getAllFields(current) {
    for (let keys in current) {
      // Do not use nested arrays or objects as headers for CSV
      if (typeof current[keys] !== 'object') fields.add(keys);
    }
    for (let child of current.children) {
      getAllFields(child)
    }
  })(obj);
  return fields;
}

function extractData(obj, fields) {
  let result = [];
  const row = [];

  for (let field of fields) {
    if (obj[field] === undefined) row.push('null'); // Handle fields for objects that do not have a value
    else row.push(obj[field]);
  }
  result.push(row);

  for (let child of obj.children) {
    result = result.concat(extractData(child, fields));
  }
  return result;
}

function formatCSV(data, fields) {
  const allData = [fields, ...data];
  const csv = allData.join('\n');
  return csv;
}

module.exports = CSVGenerator;