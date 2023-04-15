import { assertEquals } from "testing/asserts.ts";
import { format } from "./format.ts";

Deno.test("@kokr/id, format default case", () => {
  assertEquals(format(null), null);
  assertEquals(format("0"), null);
  assertEquals(format("00"), null);
  assertEquals(format("000"), null);
  assertEquals(format("0001"), null);
  assertEquals(format("00010"), null);
  assertEquals(format("000101"), null);
  assertEquals(format("0001011"), null);
  assertEquals(format("00010110"), null);
  assertEquals(format("000101100"), null);
  assertEquals(format("0001011000"), null);
  assertEquals(format("00010110000"), null);
  assertEquals(format("000101100000"), null);
  assertEquals(format("0001011000002"), "000101-1000002");
  assertEquals(format("00010110000029"), null);
});

Deno.test("@kokr/id, format with ignore invalid", () => {
  const opt = { ignoreInvalid: true };
  assertEquals(format("", opt), null);
  assertEquals(format("0", opt), "0");
  assertEquals(format("00", opt), "00");
  assertEquals(format("000", opt), "000");
  assertEquals(format("0001", opt), "0001");
  assertEquals(format("00010", opt), "00010");
  assertEquals(format("000101", opt), "000101");
  assertEquals(format("0001011", opt), "000101-1");
  assertEquals(format("00010110", opt), "000101-10");
  assertEquals(format("000101100", opt), "000101-100");
  assertEquals(format("0001011000", opt), "000101-1000");
  assertEquals(format("00010110000", opt), "000101-10000");
  assertEquals(format("000101100000", opt), "000101-100000");
  assertEquals(format("0001011000002", opt), "000101-1000002");
  assertEquals(format("00010110000029", opt), "000101-10000029");
});

Deno.test("@kokr/id, format with special characters in id", () => {
  assertEquals(
    format("^^ 0 0 0 1 0 1 _ 1 0 0 0 0 0 2 !!!"),
    "000101-1000002",
  );

  const opt = { ignoreInvalid: true };

  assertEquals(format("  ", opt), null);
  assertEquals(format(" 0 ", opt), "0");
  assertEquals(format(" 00 ", opt), "00");
  assertEquals(format(" 000 ", opt), "000");
  assertEquals(format(" 0001 ", opt), "0001");
  assertEquals(format(" 00010 ", opt), "00010");
  assertEquals(format(" 000101 ", opt), "000101");
  assertEquals(format(" 000101 - 1 ", opt), "000101-1");
  assertEquals(format(" 000101 - 10 ", opt), "000101-10");
  assertEquals(format(" 000101 - 100 ", opt), "000101-100");
  assertEquals(format(" 000101 - 1000 ", opt), "000101-1000");
  assertEquals(format(" 000101 - 10000 ", opt), "000101-10000");
  assertEquals(format(" 000101 - 100000 ", opt), "000101-100000");
  assertEquals(format(" 000101 - 1000002 ", opt), "000101-1000002");
  assertEquals(format(" 000101 - 10000029 ", opt), "000101-10000029");
});
