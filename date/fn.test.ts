import { assertEquals } from "testing/asserts.ts";
import { assertSpyCalls, stub } from "testing/mock.ts";
import { getNextBusinessDay, isHoliday } from "./fn.ts";

const dataInfos = [
  {
    date: "2022-10-27",
    name: "Something Unknown Holiday",
    holiday: true,
    remarks: null,
    kind: 1,
    time: null,
    sunLng: null,
  },
  {
    date: "2022-11-01",
    name: "Something Unknown Holiday",
    holiday: true,
    remarks: null,
    kind: 1,
    time: null,
    sunLng: null,
  },
  {
    date: "2022-11-02",
    name: "Nothing",
    holiday: false,
    remarks: null,
    kind: 1,
    time: null,
    sunLng: null,
  },
];

const DATE_FRI = "2022-10-28";
const DATE_SAT = "2022-10-29";
const DATE_SUN = "2022-10-30";
const DATE_MON = "2022-10-31";

Deno.test("@kokr/date, isHoliday", async () => {
  localStorage.clear();
  const fetchStub = stub(globalThis, "fetch", () =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(dataInfos),
    } as Response));

  assertEquals(await isHoliday(DATE_SAT), true);
  assertEquals(await isHoliday(DATE_SUN), true);

  assertSpyCalls(fetchStub, 0);

  assertEquals(await isHoliday(DATE_FRI), false);
  assertEquals(await isHoliday(DATE_MON), false);

  assertSpyCalls(fetchStub, 1);

  assertEquals(await isHoliday("2022-11-01"), true); // in the dateInfos
  assertEquals(await isHoliday("2022-11-02"), false); // in the dateInfos nothing

  fetchStub.restore();
});

Deno.test("@kokr/date, getNextBusinessDay", async () => {
  const fetchStub = stub(globalThis, "fetch", () =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(dataInfos),
    } as Response));

  assertEquals(await getNextBusinessDay(DATE_FRI, 0), DATE_FRI);
  assertEquals(await getNextBusinessDay(DATE_SAT, 0), DATE_SAT);
  assertEquals(await getNextBusinessDay(DATE_SUN, 0), DATE_SUN);
  assertEquals(await getNextBusinessDay(DATE_MON, 0), DATE_MON);

  // after
  assertEquals(await getNextBusinessDay("2022-10-28", 1), "2022-10-31");
  assertEquals(await getNextBusinessDay("2022-10-29", 1), "2022-10-31");
  assertEquals(await getNextBusinessDay("2022-10-30", 1), "2022-10-31");

  assertEquals(await getNextBusinessDay("2022-10-28", 2), "2022-11-02"); // skip 2022-11-01
  assertEquals(await getNextBusinessDay("2022-10-28", 3), "2022-11-03");

  // before
  assertEquals(await getNextBusinessDay("2022-10-31", -1), "2022-10-28");
  assertEquals(await getNextBusinessDay("2022-10-30", -1), "2022-10-28");
  assertEquals(await getNextBusinessDay("2022-10-29", -1), "2022-10-28");

  assertEquals(await getNextBusinessDay("2022-10-31", -2), "2022-10-26"); // skip 2022-10-27
  assertEquals(await getNextBusinessDay("2022-10-31", -3), "2022-10-25");

  fetchStub.restore();
});
