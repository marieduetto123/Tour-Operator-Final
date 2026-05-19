import { HOTEL_CAPACITY } from '@/data/calendarData';
import { toRooms } from '@/lib/calendar/metrics';

type Props = {
  x: number;
  y: number;
  hotelPct: number;
  toPct: number;
};

export function DayTooltip({ x, y, hotelPct, toPct }: Props) {
  const hotelRooms = toRooms(hotelPct);
  const toRoomsSold = toRooms(toPct);
  const avail = HOTEL_CAPACITY - hotelRooms - toRoomsSold;

  return (
    <div
      className="pointer-events-none fixed z-[500] min-w-[200px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg"
      style={{ left: x + 12, top: y + 12 }}
    >
      <p className="text-slate-700">
        <span className="font-semibold text-slate-900">Hotel:</span> {hotelPct}% ({hotelRooms} rooms)
      </p>
      <p className="mt-1 text-slate-700">
        <span className="font-semibold text-teal-800">TO:</span> {toPct}% ({toRoomsSold} rooms)
      </p>
      <p className="mt-1 font-medium text-slate-600">{avail} rooms available</p>
    </div>
  );
}
