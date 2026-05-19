import type { CompareMode } from '@/lib/calendar/metrics';
import type { MetricKey } from '@/data/calendarData';
import { WeekGrid } from './WeekGrid';

type Props = {
  month: number;
  startDay: number;
  compare: CompareMode;
  selectedMetrics: MetricKey[];
};

/** Weekly calendar — legacy Daily B grid (`wb-layout`) */
export function WeeklyView({ month, startDay, compare }: Props) {
  return (
    <div
      className="cal-weekly-wrap"
      role="tabpanel"
      id="cal-tabpanel-weekly"
      aria-labelledby="cal-tab-weekly"
    >
      <WeekGrid month={month} startDay={startDay} compare={compare} />
    </div>
  );
}
