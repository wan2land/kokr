import { analyze } from "./analyze.ts";

const RE_QUICK_ID =
  /^\d{2}([0][1-9]|[1][0-2])([0][1-9]|[1-2][0-9]|[3][0-1])\d{7}$/;

export interface ValidateOptions {
  enableForeigner?: boolean;
}

/** 주민등록번호가 올바른지 확인 후, Boolean을 반환합니다. */
export function validate(id: string, options: ValidateOptions = {}) {
  id = id.replace(/[^\d]/g, "");

  if (!RE_QUICK_ID.test(id)) {
    return false;
  }

  const { valid, foreigner } = analyze(id);
  if (!valid) {
    return false;
  }
  if (!options.enableForeigner && foreigner) {
    return false;
  }
  return true;
}
