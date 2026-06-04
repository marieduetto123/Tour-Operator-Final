import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from 'components/Button/Button';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SectionCard from 'components/Sections/SectionCard';
import { tokens } from 'theme/tokens';

type TabKey = 'operators' | 'contracts' | 'insights';

const OPERATOR_COLS: GridColDef[] = [
  { field: 'name', headerName: 'Operator', flex: 1.4, minWidth: 180 },
  { field: 'region', headerName: 'Region', flex: 1, minWidth: 120 },
  { field: 'segment', headerName: 'Segment', flex: 1, minWidth: 120 },
  { field: 'contractStatus', headerName: 'Contract Status', flex: 1, minWidth: 140 },
  { field: 'roomNights', headerName: 'Room Nights', flex: 1, minWidth: 120, type: 'number' },
  { field: 'revenue', headerName: 'Revenue', flex: 1, minWidth: 120, type: 'number' },
];

const operatorRows = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: ['Coastline DMC', 'Adventure Co.', 'Sunseekers Ltd', 'Globus', 'WonderTrips'][i % 5] + ` #${i + 1}`,
  region: ['EMEA', 'APAC', 'NA', 'LATAM'][i % 4],
  segment: ['FIT', 'Group', 'Wholesale', 'Series'][i % 4],
  contractStatus: ['Active', 'Pending', 'Expiring', 'Draft'][i % 4],
  roomNights: 120 + i * 13,
  revenue: 18000 + i * 1320,
}));

const CONTRACT_COLS: GridColDef[] = [
  { field: 'code', headerName: 'Contract', flex: 1, minWidth: 120 },
  { field: 'operator', headerName: 'Operator', flex: 1.2, minWidth: 160 },
  { field: 'start', headerName: 'Start', flex: 1, minWidth: 110 },
  { field: 'end', headerName: 'End', flex: 1, minWidth: 110 },
  { field: 'rate', headerName: 'Net Rate', flex: 1, minWidth: 100, type: 'number' },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: 110 },
];

const contractRows = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  code: `CN-${1000 + i}`,
  operator: ['Coastline DMC', 'Adventure Co.', 'Sunseekers Ltd'][i % 3],
  start: '2025-01-01',
  end: '2025-12-31',
  rate: 95 + i * 4,
  status: ['Active', 'Pending', 'Expired'][i % 3],
}));

const INSIGHT_COLS: GridColDef[] = [
  { field: 'insight', headerName: 'Insight', flex: 1.8, minWidth: 220 },
  { field: 'metric', headerName: 'Metric', flex: 1, minWidth: 120 },
  { field: 'delta', headerName: 'Δ vs LY', flex: 1, minWidth: 110 },
];

const insightRows = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  insight: [
    'Coastline DMC pacing 18% above last year',
    'Suite mix down 5pp WoW',
    'Adventure Co. contract expiring in 30 days',
    'APAC volume up 22% YoY',
  ][i % 4],
  metric: ['Revenue', 'Mix', 'Contracts', 'Volume'][i % 4],
  delta: ['+18%', '-5pp', '30d', '+22%'][i % 4],
}));

export default function TourOperatorsCard() {
  const [tab, setTab] = useState<TabKey>('operators');
  return (
    <SectionCard
      id="tourOperators"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outlined" color="primary" size="small" startIcon={<FileDownloadIcon />}>
            Export
          </Button>
          <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}>
            New
          </Button>
        </div>
      }
    >
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ borderBottom: '1px solid var(--border)', mb: 2 }}
      >
        <Tab label="Contacts" value="operators" />
        <Tab label="Contracts & Promotions" value="contracts" />
        <Tab label="Insights" value="insights" />
      </Tabs>
      <div style={{ height: 480, width: '100%' }}>
        {tab === 'operators' && (
          <DataGrid
            rows={operatorRows}
            columns={OPERATOR_COLS}
            density="compact"
            disableRowSelectionOnClick
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[10, 25, 50]}
            sx={gridSx}
          />
        )}
        {tab === 'contracts' && (
          <DataGrid
            rows={contractRows}
            columns={CONTRACT_COLS}
            density="compact"
            disableRowSelectionOnClick
            sx={gridSx}
          />
        )}
        {tab === 'insights' && (
          <DataGrid
            rows={insightRows}
            columns={INSIGHT_COLS}
            density="compact"
            disableRowSelectionOnClick
            sx={gridSx}
          />
        )}
      </div>
    </SectionCard>
  );
}

const gridSx = {
  border: '1px solid var(--border)',
  borderRadius: '6px',
  '.MuiDataGrid-columnHeaders': { background: tokens.tableHeader },
  '.MuiDataGrid-columnHeaderTitle': { fontWeight: 700, fontSize: 12, color: tokens.text.primary },
  '.MuiDataGrid-cell': { fontSize: 13 },
} as const;
