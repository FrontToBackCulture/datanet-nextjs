import localData from '../../data'

export function selectObject(arr, checkKey, selectKey, item) {
  let result

  if (Array.isArray(arr[0][checkKey])) {
    result = arr.filter((trend) => trend[checkKey][0] === item)
    // result = arr.filter((trend) => trend[selectKey][0] === item);
  } else {
    result = arr.filter((trend) => trend[checkKey] === item)
    // result = arr.filter((trend) => trend[selectKey] === item);
  }

  return result
}

export const selectLocalDataSource = (contentType, dataType, domain) =>
  localData[domain][dataType][contentType]?.getData()
