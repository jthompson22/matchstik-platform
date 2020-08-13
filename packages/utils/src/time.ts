import * as moment from 'moment-timezone';

export const SECOND = 1;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const MILLISECONDS = {
  SECOND: 1000,
  MINUTE: this.SECOND * 60,
  HOUR: this.MINUTE * 60,
  DAY: this.HOUR * 24,
};

export function now(): number {
  return moment().unix();
};

export function fromNow(seconds): number {
  return now() + seconds;
}

export function fromStartOfDay(seconds: number): number {
   const startOfDay = moment().startOf("day").unix();
   return Math.floor(startOfDay + seconds);
}

export const date = function(seconds?: number): Date {
  if(!seconds) return new Date();
  const millis = seconds * 1000;
  return new Date(millis);
}

export const fromDate = function(millis: number | string): number {
  return Math.floor(new Date(millis).getTime() / 1000);
}

// Use this one, it's better
export const format = function(secondsSinceEpoch, format = 'M/DD/YYYY h:mma', timezone: string = 'America/Denver'  ) {
  if(!timezone) timezone = 'America/Denver';
  const millis = date(secondsSinceEpoch);
  return moment(millis).tz(timezone).format(format);
}

export const formatTimeOfDay = function (secondsSinceEpoch, timezone?: string) {
  return format(secondsSinceEpoch, 'h:mma', timezone);
}
