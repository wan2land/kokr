import { assertEquals } from "testing/asserts.ts";
import { assertSpyCalls, spy } from "testing/mock.ts";
import { cache } from "./cache.ts";

const dataInfos = [
  {
    date: "2022-01-01",
    name: "Happy New Year!",
    holiday: true,
    remarks: null,
    kind: 1,
    time: null,
    sunLng: null,
  },
];

Deno.test("@kokr/date, cache", async () => {
  const originHolidaySpy = spy(() => Promise.resolve(dataInfos));
  const cachedHolidays = cache(originHolidaySpy);

  cachedHolidays.clear();

  assertEquals(await cachedHolidays(2020), dataInfos);
  assertEquals(await cachedHolidays(2020), dataInfos);
  assertEquals(await cachedHolidays(2020), dataInfos);
  assertEquals(await cachedHolidays(2020), dataInfos);

  assertSpyCalls(originHolidaySpy, 1);
});

Deno.test("@kokr/date, cache expired", async () => {
  const originHolidaySpy = spy(() => Promise.resolve(dataInfos));
  const cachedHolidays = cache(originHolidaySpy, { ttl: 3000 });

  cachedHolidays.clear();

  assertEquals(await cachedHolidays(2020), dataInfos);
  assertEquals(await cachedHolidays(2020), dataInfos);
  assertEquals(await cachedHolidays(2020), dataInfos);

  assertSpyCalls(originHolidaySpy, 1);

  await new Promise((resolve) => setTimeout(resolve, 3000));
  assertEquals(await cachedHolidays(2020), dataInfos);
  assertEquals(await cachedHolidays(2020), dataInfos);
  assertEquals(await cachedHolidays(2020), dataInfos);

  assertSpyCalls(originHolidaySpy, 2);
});
