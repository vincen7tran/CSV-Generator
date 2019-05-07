function CSVGenerator({data}) {
  const obj = convertData(data);
  const fields = extractFields(obj);
  const extract = extractData(obj, fields)
  const csv = formatCSV(extract, fields);
  return csv;
};

function convertData(data) {
  const removeSpace = data.split(' ');
  // Remove Semicolon
  removeSpace[removeSpace.length - 1] = removeSpace[removeSpace.length - 1].slice(0,1);
  return JSON.parse(removeSpace.join(''));
}

function extractFields(obj) {
  const fields = [];
  for (let keys in obj) {
    // Do not use nested arrays or objects as headers for CSV
    if (typeof obj[keys] !== 'object') fields.push(keys);
  }
  return fields;
}

function extractData(obj, fields) {
  let result = [];
  const row = [];
  for (let field of fields) {
    row.push(obj[field]);
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