interface blankPeriod {
  startTime: string;
  blankPeriod: number;
  startTimeInt: number;
}

interface tempSpecialPeriodModel {
  startTime: string;
  endTime: string;
  text: string;
  day: string;
  color: string;
}

interface AssemblyModel {
  name: string;
  startingAt: string;
  duration: string;
}
interface BreakModel {
  name: string;
  firstBreak: string;
  day: string;
  after: string;
  duration: string;
}

interface CalendarModel {
  day: string;
  periods: Array<string>;
  startTime: string;
  periodDuration: string;
  intervaBtwPeriods: string;

  breaks: {
    name: string;
    firstBreak: string;
    day: string;
    after: string;
    duration: string;
  }[];
  assembly: {
    name: string;
    startingAt: string;
    duration: string;
  };
}

export {
  CalendarModel,
  blankPeriod,
  tempSpecialPeriodModel,
  AssemblyModel,
  BreakModel
};
