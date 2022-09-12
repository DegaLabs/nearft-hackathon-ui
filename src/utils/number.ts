import * as math from 'mathjs'

export function formatWithCommas(value: string): string {
  const pattern = /(-?\d+)(\d{3})/
  while (pattern.test(value)) {
    value = value.replace(pattern, '$1,$2')
  }
  return value
}

export function divide(numerator: string, denominator: string) {
  return math.format(math.evaluate(`${numerator} / ${denominator}`), {
    notation: 'fixed',
  })
}

export function multiply(factor1: string, factor2: string) {
  return math.format(math.evaluate(`${factor1} * ${factor2}`), {
    notation: 'fixed',
  })
}

export const percent = (numerator: string, denominator: string) => {
  return math.evaluate(`(${numerator} / ${denominator}) * 100`)
}

export const toPrecision = (
  number: string,
  precision: number,
  withCommas: boolean = false,
  atLeastOne: boolean = true,
): string => {
  const [whole, decimal = ''] = number.split('.')

  let str = `${withCommas ? formatWithCommas(whole) : whole}.${decimal.slice(0, precision)}`.replace(/\.$/, '')
  if (atLeastOne && Number(str) === 0 && str.length > 1) {
    var n = str.lastIndexOf('0')
    str = str.slice(0, n) + str.slice(n).replace('0', '1')
  }

  return str
}

export const toReadableNumber = (decimals: number, number: string = '0'): string => {
  if (!decimals) return number

  const wholeStr = number.substring(0, number.length - decimals) || '0'
  const fractionStr = number
    .substring(number.length - decimals)
    .padStart(decimals, '0')
    .substring(0, decimals)

  return `${wholeStr}.${fractionStr}`.replace(/\.?0+$/, '')
}

export const toRoundedReadableNumber = ({
  decimals,
  number,
  precision = 6,
  withCommas = true,
}: {
  decimals: number
  number?: string
  precision?: number
  withCommas?: boolean
}): string => {
  return toPrecision(toReadableNumber(decimals, number), precision, withCommas)
}
