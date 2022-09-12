export function trimName(name, start = 18, end = 16, total = 40) {
  if (name?.length > total) {
    return `${name.substring(0, start)}...${name.substring(name.length - end)}`
  } else {
    return name
  }
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

