import {Injectable} from '@angular/core';
import {AppState} from "../store/app.state";
import {Store} from "@ngrx/store";
import {loadDaysOff} from "../store/days-off/days-off.action";
import {selectDaysOff} from "../store/days-off/days-off.selectors";

@Injectable({
  providedIn: 'root'
})
export class SwedishHolidaysService {

  daysOff?: Map<string, Boolean>;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadDaysOff());
    this.store.select(selectDaysOff).subscribe(daysOff => this.daysOff = daysOff);
  }

  static readonly FIXED_HOLIDAYS = new Map<string, string>([
    ['1-1', 'Nyårsdagen'],
    ['1-6', 'Trettondedag jul'],
    ['5-1', 'Första maj'],
    ['6-6', 'Sveriges nationaldag'],
    ['12-24', 'Julafton'],
    ['12-25', 'Juldagen'],
    ['12-26', 'Annandag jul'],
    ['12-31', 'Nyårsafton'],
  ]);

  private holidayCache = new Map<number, Map<number, string>>();

  public isHoliday(date: Date): {isHoliday: boolean, holiday: string | undefined} {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const cleanDate = new Date(year, month, day);
    const holidays = this.getAllHolidays(year);
    let isHoliday = holidays.has(cleanDate.getTime())
    const holiday = holidays.get(cleanDate.getTime());

    if (!this.daysOff || !this.daysOff.get(holiday!)) {
      isHoliday = false
    }
    return {isHoliday, holiday};
  }

  private getAllHolidays(year: number): Map<number, string> {
    if (this.holidayCache.has(year)) {
      return this.holidayCache.get(year)!;
    }

    const holidays = this.calculateFixedHolidays(year);
    this.addDynamicHolidays(holidays, year);

    // Sort holidays by date and cache them
    holidays.sort((a, b) => a.date.getTime() - b.date.getTime());
    const holidaysMap = new Map(holidays.map(holiday => [holiday.date.getTime(), holiday.name]));
    this.holidayCache.set(year, holidaysMap);

    return holidaysMap;
  }

  private calculateFixedHolidays(year: number): Array<{ date: Date; name: string }> {
    return Array.from(SwedishHolidaysService.FIXED_HOLIDAYS.entries()).map(([key, name]) => {
      const [month, day] = key.split('-').map(Number);
      return { date: new Date(year, month - 1, day), name };
    });
  }

  private addDynamicHolidays(holidays: Array<{ date: Date; name: string }>, year: number) {
    const easterDate = this.getEasterDate(year);
    holidays.push(
      { date: easterDate, name: 'Påskdagen' },
      { date: new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate() - 3), name: 'Skärtorsdag' },
      { date: new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate() - 2), name: 'Långfredagen' },
      { date: new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate() - 1), name: 'Påskafton' },
      { date: new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate() + 1), name: 'Annandag påsk' },
      { date: this.getKristiHimmelsfardsDay(year), name: 'Kristi Himmelsfärdsdag' },
      { date: new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate() + 49), name: 'Pingstdagen' },
      { date: new Date(easterDate.getFullYear(), easterDate.getMonth(), easterDate.getDate() + 50), name: 'Annandag pingst' },
      { date: this.calculateMidsummerEve(year), name: 'Midsommarafton' },
      { date: new Date(this.calculateMidsummerEve(year).getFullYear(), this.calculateMidsummerEve(year).getMonth(), this.calculateMidsummerEve(year).getDate() + 1), name: 'Midsommardagen' },
      { date: this.calculateAllSaintsDay(year), name: 'Alla helgons dag' }
    );
  }

  private getEasterDate(year: number) {
    const century = Math.floor(year / 100);
    const moonCycle = year - 19 * Math.floor(year / 19);
    const moonCorrection = Math.floor((century - 17) / 25);
    let goldenNumber = century - Math.floor(century / 4) - Math.floor((century - moonCorrection) / 3) + 19 * moonCycle + 15;
    goldenNumber = goldenNumber - 30 * Math.floor((goldenNumber / 30));
    goldenNumber = goldenNumber - Math.floor(goldenNumber / 28) * (1 - Math.floor(goldenNumber / 28) * Math.floor(29 / (goldenNumber + 1)) * Math.floor((21 - moonCycle) / 11));
    let dayOffset = year + Math.floor(year / 4) + goldenNumber + 2 - century + Math.floor(century / 4);
    dayOffset = dayOffset - 7 * Math.floor(dayOffset / 7);
    const correctedDay = goldenNumber - dayOffset;
    const monthIndex = 3 + Math.floor((correctedDay + 40) / 44);
    const dayOfMonth = correctedDay + 28 - 31 * Math.floor(monthIndex / 4);

    return new Date(year, monthIndex - 1, dayOfMonth);
  }

  private getKristiHimmelsfardsDay(year: number): Date {
    const easter = this.getEasterDate(year);
    return new Date(easter.getFullYear(), easter.getMonth(), easter.getDate() + 39);
  }

  private calculateAllSaintsDay(year: number): Date {
    let date = new Date(year, 9, 31);
    let dayOfWeek = date.getDay();
    date.setDate(date.getDate() + ((dayOfWeek === 6) ? 0 : 6 - dayOfWeek));
    return date;
  }

  private calculateMidsummerEve(year: number): Date {
    let date = new Date(year, 5, 19); // 19th June is the earliest possible Midsummer Eve
    let dayOfWeek = date.getDay();
    date.setDate(date.getDate() + ((dayOfWeek === 5) ? 0 : 5 - dayOfWeek + (dayOfWeek < 5 ? 0 : 7)));
    return date;
  }
}
