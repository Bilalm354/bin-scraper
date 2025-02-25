import { fetchBinCollectionSchedule } from "./fetchBinCollectionSchedule";

describe("fetchBinCollectionSchedule", () => {
  it("returns x", async () => {
    const schedule = await fetchBinCollectionSchedule();
    expect(schedule).toMatchInlineSnapshot(`
[
  {
    "inline": false,
    "name": "Blue Recycling Bin",
    "value": "Monday 10th February",
  },
  {
    "inline": false,
    "name": "Green Refuse Bin",
    "value": "Monday 17th February",
  },
  {
    "inline": false,
    "name": "Purple/Purple-lidded Paper/Card Bin",
    "value": "Monday 24th February",
  },
]
`);
  }, 30000);
});
