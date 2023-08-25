type MaybeObject<T = any> = T | Record<string, T>

function isUUID(str: string): boolean {
  const uuidRegex: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export function findRelations(
  obj: MaybeObject,
  componentName: string = "",
  relations: string[] = []
): string[] {
  if (typeof obj === "object" && obj !== null) {
    if ("component" in obj) {
      componentName = obj.component
    }

    for (const key in obj) {
      if (
        typeof obj[key] === "string" &&
        isUUID(obj[key]) &&
        !key.match(/(id|_id|_uid|uuid)$/)
      ) {
        relations.push(`${componentName}.${key}`)
      } else if (
        Array.isArray(obj[key]) &&
        obj[key].every(isUUID) &&
        !key.match(/(_ids|_uids)$/)
      ) {
        relations.push(`${componentName}.${key}`)
      } else if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !key.endsWith(".id")
      ) {
        findRelations(obj[key] as MaybeObject, componentName, relations)
      }
    }
  }

  return Array.from(new Set(relations))
}
