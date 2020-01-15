module.exports = function parseStringAsArray(arrayAsString) {
    const array = arrayAsString.split(',').map(tech => tech.trim());
    return array;
}