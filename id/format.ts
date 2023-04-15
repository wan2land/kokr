import { validate } from "./validate.ts";

export interface FormatOptions {
  /** 올바르지 않은 주민등록번호를 무시할지 여부를 지정합니다. */
  ignoreInvalid?: boolean;
}

export function format(
  id?: string | null,
  options: FormatOptions = {},
): string | null {
  if (!options.ignoreInvalid && !validate(id)) {
    return null;
  }
  id = (id ?? "").replace(/[^0-9]/g, "");
  const len = id.length;

  if (len === 0) {
    return null;
  }

  if (len <= 6) {
    return id;
  }
  return [id.slice(0, 6), id.slice(6)].filter((c) => c).join("-");
}
