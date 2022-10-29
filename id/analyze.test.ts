import { assertEquals } from "testing/asserts.ts";
import { analyze } from "./analyze.ts";

Deno.test("@kokr/id, analyze invalid length", () => {
  assertEquals(analyze(""), {
    valid: false,
    parity: null,
    gender: null,
    foreigner: null,
    birth: null,
    age: null,
    krAge: null,
  });
  assertEquals(analyze("0"), {
    valid: false,
    parity: null,
    gender: null,
    foreigner: null,
    birth: null,
    age: null,
    krAge: null,
  });
  assertEquals(analyze("00"), {
    valid: false,
    parity: null,
    gender: null,
    foreigner: null,
    birth: null,
    age: null,
    krAge: null,
  });
  assertEquals(analyze("000"), {
    valid: false,
    parity: null,
    gender: null,
    foreigner: null,
    birth: null,
    age: null,
    krAge: null,
  });
  assertEquals(analyze("0001"), {
    valid: false,
    parity: null,
    gender: null,
    foreigner: null,
    birth: null,
    age: null,
    krAge: null,
  });
  assertEquals(analyze("00010"), {
    valid: false,
    parity: null,
    gender: null,
    foreigner: null,
    birth: null,
    age: null,
    krAge: null,
  });
  assertEquals(analyze("000101"), {
    valid: false,
    parity: null,
    gender: null,
    foreigner: null,
    birth: null,
    age: null,
    krAge: null,
  });
  assertEquals(analyze("000101-"), {
    valid: false,
    parity: null,
    gender: null,
    foreigner: null,
    birth: null,
    age: null,
    krAge: null,
  });

  assertEquals(analyze("000101-1", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-10", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-100", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-1000", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-10000", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-100000", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-1000002", { now: "2021-06-01" }), {
    valid: true,
    parity: 2,
    gender: "M",
    foreigner: false,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  }); // true!
  assertEquals(analyze("000101-10000020", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
});

Deno.test("@kokr/id, analyze date - invalid", () => {
  assertEquals(analyze("000000-1"), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: null,
    age: null,
    krAge: null,
  });
  assertEquals(analyze("010001-1"), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: null,
    age: null,
    krAge: null,
  });
  assertEquals(analyze("011301-1"), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: null,
    age: null,
    krAge: null,
  });
  assertEquals(analyze("010100-1"), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: null,
    age: null,
    krAge: null,
  });
  assertEquals(analyze("010132-1"), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: null,
    age: null,
    krAge: null,
  });

  const leapYear1800 = [
    1804,
    1808,
    1812,
    1816,
    1820,
    1824,
    1828,
    1832,
    1836,
    1840,
    1844,
    1848,
    1852,
    1856,
    1860,
    1864,
    1868,
    1872,
    1876,
    1880,
    1884,
    1888,
    1892,
    1896,
  ];
  const leapYear1900 = [
    1904,
    1908,
    1912,
    1916,
    1920,
    1924,
    1928,
    1932,
    1936,
    1940,
    1944,
    1948,
    1952,
    1956,
    1960,
    1964,
    1968,
    1972,
    1976,
    1980,
    1984,
    1988,
    1992,
    1996,
  ];
  const leapYear2000 = [
    2000,
    2004,
    2008,
    2012,
    2016,
    2020,
    2024,
    2028,
    2032,
    2036,
    2040,
    2044,
    2048,
    2052,
    2056,
    2060,
    2064,
    2068,
    2072,
    2076,
    2080,
    2084,
    2088,
    2092,
    2096,
  ];
  for (let i = 0; i < 100; i++) {
    const year = `${i}`.padStart(2, "0");
    if (leapYear1800.includes(1800 + i)) {
      assertEquals(analyze(`${year}0228-9`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "M",
        foreigner: false,
        birth: `18${year}-02-28`,
        age: 221 - i,
        krAge: 222 - i,
      });
      assertEquals(analyze(`${year}0229-0`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "F",
        foreigner: false,
        birth: `18${year}-02-29`,
        age: 221 - i,
        krAge: 222 - i,
      });
      assertEquals(analyze(`${year}0301-9`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "M",
        foreigner: false,
        birth: `18${year}-03-01`,
        age: 221 - i,
        krAge: 222 - i,
      });
    } else {
      assertEquals(analyze(`${year}0228-0`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "F",
        foreigner: false,
        birth: `18${year}-02-28`,
        age: 221 - i,
        krAge: 222 - i,
      });
      assertEquals(analyze(`${year}0229-9`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "M",
        foreigner: false,
        birth: null,
        age: null,
        krAge: null,
      });
      assertEquals(analyze(`${year}0301-0`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "F",
        foreigner: false,
        birth: `18${year}-03-01`,
        age: 221 - i,
        krAge: 222 - i,
      });
    }
    if (leapYear1900.includes(1900 + i)) {
      assertEquals(analyze(`${year}0228-1`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "M",
        foreigner: false,
        birth: `19${year}-02-28`,
        age: 121 - i,
        krAge: 122 - i,
      });
      assertEquals(analyze(`${year}0229-2`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "F",
        foreigner: false,
        birth: `19${year}-02-29`,
        age: 121 - i,
        krAge: 122 - i,
      });
      assertEquals(analyze(`${year}0301-1`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "M",
        foreigner: false,
        birth: `19${year}-03-01`,
        age: 121 - i,
        krAge: 122 - i,
      });
    } else {
      assertEquals(analyze(`${year}0228-2`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "F",
        foreigner: false,
        birth: `19${year}-02-28`,
        age: 121 - i,
        krAge: 122 - i,
      });
      assertEquals(analyze(`${year}0229-1`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "M",
        foreigner: false,
        birth: null,
        age: null,
        krAge: null,
      });
      assertEquals(analyze(`${year}0301-2`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "F",
        foreigner: false,
        birth: `19${year}-03-01`,
        age: 121 - i,
        krAge: 122 - i,
      });
    }
    if (leapYear2000.includes(2000 + i)) {
      assertEquals(analyze(`${year}0228-3`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "M",
        foreigner: false,
        birth: `20${year}-02-28`,
        age: 21 - i,
        krAge: 22 - i,
      });
      assertEquals(analyze(`${year}0229-4`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "F",
        foreigner: false,
        birth: `20${year}-02-29`,
        age: 21 - i,
        krAge: 22 - i,
      });
      assertEquals(analyze(`${year}0301-3`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "M",
        foreigner: false,
        birth: `20${year}-03-01`,
        age: 21 - i,
        krAge: 22 - i,
      });
    } else {
      assertEquals(analyze(`${year}0228-4`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "F",
        foreigner: false,
        birth: `20${year}-02-28`,
        age: 21 - i,
        krAge: 22 - i,
      });
      assertEquals(analyze(`${year}0229-3`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "M",
        foreigner: false,
        birth: null,
        age: null,
        krAge: null,
      });
      assertEquals(analyze(`${year}0301-4`, { now: "2021-06-01" }), {
        valid: false,
        parity: null,
        gender: "F",
        foreigner: false,
        birth: `20${year}-03-01`,
        age: 21 - i,
        krAge: 22 - i,
      });
    }
  }
});

Deno.test("@kokr/id, analyze gender, foreign, birth - invalid", () => {
  assertEquals(analyze("000101-1", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-2", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "F",
    foreigner: false,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-3", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: "2000-01-01",
    age: 21,
    krAge: 22,
  });
  assertEquals(analyze("000101-4", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "F",
    foreigner: false,
    birth: "2000-01-01",
    age: 21,
    krAge: 22,
  });
  assertEquals(analyze("000101-5", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: true,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-6", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "F",
    foreigner: true,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-7", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: true,
    birth: "2000-01-01",
    age: 21,
    krAge: 22,
  });
  assertEquals(analyze("000101-8", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "F",
    foreigner: true,
    birth: "2000-01-01",
    age: 21,
    krAge: 22,
  });
  assertEquals(analyze("000101-9", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "M",
    foreigner: false,
    birth: "1800-01-01",
    age: 221,
    krAge: 222,
  });
  assertEquals(analyze("000101-0", { now: "2021-06-01" }), {
    valid: false,
    parity: null,
    gender: "F",
    foreigner: false,
    birth: "1800-01-01",
    age: 221,
    krAge: 222,
  });
});

Deno.test("@kokr/id, analyze valid", () => {
  assertEquals(analyze("000101-1000002", { now: "2021-06-01" }), {
    valid: true,
    parity: 2,
    gender: "M",
    foreigner: false,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-2000005", { now: "2021-06-01" }), {
    valid: true,
    parity: 5,
    gender: "F",
    foreigner: false,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-3000008", { now: "2021-06-01" }), {
    valid: true,
    parity: 8,
    gender: "M",
    foreigner: false,
    birth: "2000-01-01",
    age: 21,
    krAge: 22,
  });
  assertEquals(analyze("000101-4000001", { now: "2021-06-01" }), {
    valid: true,
    parity: 1,
    gender: "F",
    foreigner: false,
    birth: "2000-01-01",
    age: 21,
    krAge: 22,
  });
  assertEquals(analyze("000101-5000005", { now: "2021-06-01" }), {
    valid: true,
    parity: 5,
    gender: "M",
    foreigner: true,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-6000008", { now: "2021-06-01" }), {
    valid: true,
    parity: 8,
    gender: "F",
    foreigner: true,
    birth: "1900-01-01",
    age: 121,
    krAge: 122,
  });
  assertEquals(analyze("000101-7000001", { now: "2021-06-01" }), {
    valid: true,
    parity: 1,
    gender: "M",
    foreigner: true,
    birth: "2000-01-01",
    age: 21,
    krAge: 22,
  });
  assertEquals(analyze("000101-8000003", { now: "2021-06-01" }), {
    valid: true,
    parity: 3,
    gender: "F",
    foreigner: true,
    birth: "2000-01-01",
    age: 21,
    krAge: 22,
  });
  assertEquals(analyze("000101-9000004", { now: "2021-06-01" }), {
    valid: true,
    parity: 4,
    gender: "M",
    foreigner: false,
    birth: "1800-01-01",
    age: 221,
    krAge: 222,
  });
  assertEquals(analyze("000101-0000000", { now: "2021-06-01" }), {
    valid: true,
    parity: 0,
    gender: "F",
    foreigner: false,
    birth: "1800-01-01",
    age: 221,
    krAge: 222,
  });
});

Deno.test("@kokr/id, analyze age, krAge", () => {
  assertEquals(analyze("900531-1", { now: "2021-06-01" }).age, 31);
  assertEquals(analyze("900601-1", { now: "2021-06-01" }).age, 31);
  assertEquals(analyze("900602-1", { now: "2021-06-01" }).age, 30);

  assertEquals(analyze("900601-1", { now: "2021-05-31" }).age, 30);
  assertEquals(analyze("900601-1", { now: "2021-06-01" }).age, 31);
  assertEquals(analyze("900601-1", { now: "2021-06-02" }).age, 31);

  assertEquals(analyze("900531-1", { now: "2021-06-01" }).krAge, 32);
  assertEquals(analyze("900601-1", { now: "2021-06-01" }).krAge, 32);
  assertEquals(analyze("900602-1", { now: "2021-06-01" }).krAge, 32);

  assertEquals(analyze("900601-1", { now: "2020-12-31" }).krAge, 31);
  assertEquals(analyze("900601-1", { now: "2021-01-01" }).krAge, 32);
});
