import { Icon } from '@/components/ui/Icon';

export function CalendarLegend() {
  return (
    <div className="cal-legend">
      <div className="leg-item">
        <Icon name="visibility" style={{ fontSize: 14 }} />
        <span>Hover cell for quick view</span>
      </div>
      <div className="leg-item">
        <Icon name="lock" style={{ fontSize: 14, color: '#dc2626' }} />
        <span>Full close out</span>
      </div>
      <div className="leg-item">
        <Icon name="lock" style={{ fontSize: 14, color: '#ea580c' }} />
        <span>Partial close out</span>
      </div>
      <div className="leg-item leg-item-event">
        <Icon name="today" style={{ fontSize: 18, color: '#006461' }} />
        <span>Event</span>
      </div>
      <div className="leg-item">
        <span className="leg-color-swatch" style={{ background: '#1C1C1C' }} />
        <span>Hotel</span>
      </div>
      <div className="leg-item">
        <span className="leg-color-swatch" style={{ background: '#47c5bc' }} />
        <span>Tour Operator</span>
      </div>
    </div>
  );
}
