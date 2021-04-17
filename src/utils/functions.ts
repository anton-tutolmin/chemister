import { INameable } from "src/common/interfaces"

export const getNumberForDuplicatedName = (data: INameable[], duplicatedName)  => {
  if (data.length) {
    const dataNameNumbers = data
      .filter(dataItem => dataItem.name.match(/\w*( \(\d*\))?/g))
      .map(dataItem => dataItem.name.replace(duplicatedName, '')
      .replace(/\D/g, ''));

    const newDataNameNumber = dataNameNumbers
      .map(str => str.length ? Number.parseInt(str) : 0)
      .sort((a, b) => a - b)
      .reduce((acc, curr, i) => curr === i ? curr : acc , undefined) + 1;

    return ` (${newDataNameNumber})`;
  } else {
    return '';
  }
}