import { Fragment, useMemo, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { DOW_SHORT } from '@/data/calendarData';
import { useCalendar } from '@/context/CalendarContext';
import { buildCellMetrics, buildMetricRows, dayKey } from '@/lib/calendar/metrics';
import type { MetricKey } from '@/data/calendarData';

type Props = {
  selectedMetrics: MetricKey[];
};

function weekDaysForAnchor(month: number, startDay: number) {
  const days: { month: number; day: number }[] = [];
  for (let i = 0; i < 7; i++) {
    days.push({ month, day: startDay + i });
  }
  return days;
}

type AccordionSection = {
  id: string;
  title: string;
  rows: { label: string; values: string[] }[];
};

export function WeeklyView({ selectedMetrics }: Props) {
  const { weekAnchor, getFilteredOccupancy, isLocked, isPartial } = useCalendar();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const days = useMemo(
    () => weekDaysForAnchor(weekAnchor.month, weekAnchor.day),
    [weekAnchor],
  );

  const metricRows = days.map(({ month, day }) => {
    const m = buildCellMetrics(month, day);
    return buildMetricRows(m, selectedMetrics);
  });

  const sections: AccordionSection[] = [
    {
      id: 'otb',
      title: 'On The Books',
      rows: selectedMetrics.map((key, ri) => ({
        label: key.startsWith('t') ? `TO ${key.slice(1)}` : `Hotel ${key.slice(1)}`,
        values: days.map((_, di) => metricRows[di][ri]?.value ?? '—'),
      })),
    },
    {
      id: 'pickup',
      title: 'Pickup',
      rows: [
        {
          label: 'Hotel Pickup',
          values: days.map(({ month, day }) => {
            const p = 5 + Math.abs((month * 7 + day) % 12);
            return `${p >= 0 ? '+' : ''}${p}`;
          }),
        },
      ],
    },
    {
      id: 'closeouts',
      title: 'Close Outs',
      rows: [
        {
          label: 'Status',
          values: days.map(({ month, day }) => {
            const k = dayKey(month, day);
            if (isLocked(k)) return 'Closed';
            if (isPartial(k)) return 'Partial';
            return 'Open';
          }),
        },
      ],
    },
  ];

  return (
    <TableContainer
      className="cal-weekly-table"
      sx={{ p: 2 }}
      role="tabpanel"
      id="cal-tabpanel-weekly"
      aria-labelledby="cal-tab-weekly"
    >
      <Table size="small" sx={{ minWidth: 720 }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                position: 'sticky',
                left: 0,
                zIndex: 1,
                bgcolor: 'background.paper',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: 11,
              }}
            >
              Metric
            </TableCell>
            {days.map(({ day }, i) => (
              <TableCell key={day} align="center" sx={{ fontSize: 12 }}>
                <Typography variant="caption" sx={{ display: 'block' }}>
                  {DOW_SHORT[i]}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {day}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sections.map((section) => (
            <Fragment key={section.id}>
              <TableRow
                hover
                sx={{ cursor: 'pointer', bgcolor: 'action.hover' }}
                onClick={() =>
                  setCollapsed((c) => ({ ...c, [section.id]: !c[section.id] }))
                }
              >
                <TableCell colSpan={8} sx={{ fontWeight: 600 }}>
                  <ExpandMoreIcon
                    sx={{
                      mr: 0.5,
                      verticalAlign: 'middle',
                      transform: collapsed[section.id] ? 'rotate(-90deg)' : 'none',
                      transition: 'transform 0.15s',
                    }}
                    fontSize="small"
                  />
                  {section.title}
                </TableCell>
              </TableRow>
              {!collapsed[section.id] &&
                section.rows.map((row) => (
                  <TableRow key={`${section.id}-${row.label}`}>
                    <TableCell
                      sx={{
                        position: 'sticky',
                        left: 0,
                        bgcolor: 'background.paper',
                        color: 'text.secondary',
                      }}
                    >
                      {row.label}
                    </TableCell>
                    {row.values.map((val, i) => {
                      const { month, day: d } = days[i];
                      const { hotel, to } = getFilteredOccupancy(month, d);
                      const occ = selectedMetrics[0]?.startsWith('t') ? to : hotel;
                      const color =
                        occ >= 85 ? 'error.main' : occ >= 70 ? 'warning.dark' : 'text.primary';
                      return (
                        <TableCell
                          key={i}
                          align="center"
                          sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color }}
                        >
                          {val}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
