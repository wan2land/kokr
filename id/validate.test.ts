import { assertEquals } from "testing/asserts.ts";
import { validate } from "./validate.ts";

Deno.test("@kokr/id, validate korean", () => {
  assertEquals(validate("010101"), false); // wrong length
  assertEquals(validate("010001-1010104"), false); // wrong month
  assertEquals(validate("011301-1010104"), false); // wrong month
  assertEquals(validate("010100-1010104"), false); // wrong day
  assertEquals(validate("010132-1010104"), false); // wrong day

  assertEquals(validate("0101011010104"), true);
  assertEquals(validate("0101012010107"), true);
  assertEquals(validate("0101013010100"), true);
  assertEquals(validate("0101014010102"), true);
  assertEquals(validate("0101019010106"), true);
  assertEquals(validate("0101010010101"), true);

  assertEquals(validate("010101-1010104"), true);
  assertEquals(validate("010101-2010107"), true);
  assertEquals(validate("010101-3010100"), true);
  assertEquals(validate("010101-4010102"), true);
  assertEquals(validate("010101-9010106"), true);
  assertEquals(validate("010101-0010101"), true);

  assertEquals(validate("010101 - 1010104"), true);
  assertEquals(validate("010101 - 2010107"), true);
  assertEquals(validate("010101 - 3010100"), true);
  assertEquals(validate("010101 - 4010102"), true);
  assertEquals(validate("010101 - 9010106"), true);
  assertEquals(validate("010101 - 0010101"), true);
});

Deno.test("@kokr/id, validate foreigner", () => {
  // korean parity
  assertEquals(validate("010101-5010105"), false);
  assertEquals(validate("010101-6010108"), false);
  assertEquals(validate("010101-7010101"), false);
  assertEquals(validate("010101-8010103"), false);

  assertEquals(validate("010101-5010107"), false);
  assertEquals(validate("010101-6010100"), false);
  assertEquals(validate("010101-7010103"), false);
  assertEquals(validate("010101-8010105"), false);

  assertEquals(validate("010101-5010105", { enableForeigner: true }), false);
  assertEquals(validate("010101-6010108", { enableForeigner: true }), false);
  assertEquals(validate("010101-7010101", { enableForeigner: true }), false);
  assertEquals(validate("010101-8010103", { enableForeigner: true }), false);

  assertEquals(validate("010101-5010107", { enableForeigner: true }), true);
  assertEquals(validate("010101-6010100", { enableForeigner: true }), true);
  assertEquals(validate("010101-7010103", { enableForeigner: true }), true);
  assertEquals(validate("010101-8010105", { enableForeigner: true }), true);

  assertEquals(validate("010101-8010105", { enableForeigner: true }), true);
});
