import { assertEquals } from "testing/asserts.ts";
import { assertSpyCallArgs, stub } from "testing/mock.ts";
import { getHolidaysFromHttp } from "./holiday.ts";

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

Deno.test("@kokr/date, getHolidaysFromHttp", async () => {
  const fetchStub = stub(globalThis, "fetch", () =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(dataInfos),
    } as Response));

  const actual = await getHolidaysFromHttp(2020, {
    uris: [(year) => `https://test.dist.be/${year}.json`],
  });

  assertEquals(actual, dataInfos);
  assertSpyCallArgs(fetchStub, 0, ["https://test.dist.be/2020.json"]);

  fetchStub.restore();
});
