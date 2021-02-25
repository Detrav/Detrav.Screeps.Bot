import { disconnect } from "process";

export interface PlanPoint {
  x: number;
  y: number;
  distance: number;
}

export const planMake = function (planStr: string): PlanPoint[] {
  const arr = _.select(planStr.trim().split("\n"), m => m.trim());

  var rowO = 0;
  var columnO = 0;

  rowO = _.findIndex(arr, line => {
    columnO = line.indexOf("O");
    return columnO !== -1;
  });

  let result: PlanPoint[] = [];

  for (let j = 0; j < arr.length; j++) {
    const line = arr[j];
    for (let i = 0; i < line.length; i++) {
      let ch = line.charAt(i);
      switch (ch) {
        case "X":
          const point: PlanPoint = {
            x: i - columnO,
            y: j - rowO,
            distance: (i - columnO) * (i - columnO) + (j - rowO) * (j - rowO)
          };
          result.push(point);
          break;
      }
    }
  }

  return _.sortBy(result, m => m.distance);
};
