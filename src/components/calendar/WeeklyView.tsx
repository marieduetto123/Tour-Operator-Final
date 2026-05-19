import type { Dispatch, SetStateAction } from 'react';
import type { CompareMode } from '@/lib/calendar/metrics';
import type { MetricKey } from '@/data/calendarData';
import { WeekGrid } from './WeekGrid';

type Props = {
  month: number;
  startDay: number;
  compare: CompareMode;
  selectedMetrics: MetricKey[];
  collapsed: Record<string, boolean>;
  onCollapsedChange: Dispatch<SetStateAction<Record<string, boolean>>>;
};

/** Weekly calendar — legacy Daily B grid (`wb-layout`) */
export function WeeklyView({
  month,
  startDay,
  compare,
  collapsed,
  onCollapsedChange,
}: Props) {
  return (
    <div
      className="cal-weekly-wrap"
      role="tabpanel"
      id="cal-tabpanel-weekly"
      aria-labelledby="cal-tab-weekly"
    >
      <WeekGrid
        month={month}
        startDay={startDay}
        compare={compare}
        collapsed={collapsed}
        onCollapsedChange={onCollapsedChange}
      />
    </div>
  );
}
