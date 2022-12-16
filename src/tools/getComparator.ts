function descendingComparator (a: any, b: any, orderBy: keyof any): (0 | 1 | -1) {
  if (!!b[orderBy].getTime && !!a[orderBy].getTime) {
    if (b[orderBy].getTime() < a[orderBy].getTime()) {
      return -1
    }
    if (b[orderBy].getTime() > a[orderBy].getTime()) {
      return 1
    }
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
  }
  return 0
}

export function getComparator<Key extends keyof any> (
  order: Order,
  orderBy: Key
): (
    a: { [key in Key]: string | undefined | number | Date },
    b: { [key in Key]: string | undefined | number | Date },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export type Order = 'asc' | 'desc'
// How to use:
// array.slice().sort(getComparator('asc', orderBy))
