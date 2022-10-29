import { assertEquals } from "testing/asserts.ts";
import { format } from "./format.ts";

Deno.test("@kokr/phone, format", () => {
  const prefix = [
    "02", // seoul
    "0505", // LG+
    "010",
    "011",
    "012",
    "015",
    "016",
    "017",
    "018",
    "019", // mobile
    "030",
    "050",
    "060",
    "070",
    "080", // etc
    "031",
    "032",
    "033",
    "041",
    "042",
    "043",
    "044",
    "051",
    "052",
    "053",
    "054",
    "055",
    "061",
    "062",
    "063",
    "064", // local
  ];
  for (const no of prefix) {
    assertEquals(format(`${no}`), `${no}`);
    assertEquals(format(`${no}1`), `${no}-1`);
    assertEquals(format(`${no}12`), `${no}-12`);
    assertEquals(format(`${no}123`), `${no}-123`);
    assertEquals(format(`${no}1234`), `${no}-123-4`);
    assertEquals(format(`${no}12345`), `${no}-123-45`);
    assertEquals(format(`${no}123456`), `${no}-123-456`);
    assertEquals(format(`${no}1234567`), `${no}-123-4567`);
    assertEquals(format(`${no}12345678`), `${no}-1234-5678`);
    assertEquals(format(`${no}123456789`), `${no}123456789`); // unknown

    assertEquals(format(`${no}####****`), `${no}-####-****`); // special chars
    assertEquals(format(`${no}!@#$%^&*()-_=+\\|`), `${no}-#*`); // escape special chars
  }
});

Deno.test("@kokr/phone, format 15xx ~ 19xx", () => {
  const prefix = [
    "1588",
    "1577",
    "1899",
    "1544",
    "1644",
    "1661",
    "1566",
    "1600",
    "1670",
    "1688",
    "1666",
    "1599",
    "1877",
    "1855",
    "1800",
  ];
  for (const no of prefix) {
    assertEquals(format(`${no}`), `${no}`);
    assertEquals(format(`${no}1`), `${no}-1`);
    assertEquals(format(`${no}12`), `${no}-12`);
    assertEquals(format(`${no}123`), `${no}-123`);
    assertEquals(format(`${no}1234`), `${no}-1234`);
    assertEquals(format(`${no}12345`), `${no}12345`); // unknown
  }
});
