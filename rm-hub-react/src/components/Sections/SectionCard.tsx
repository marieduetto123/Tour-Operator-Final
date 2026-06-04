import { ReactNode } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type Props = {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  id?: string;
  className?: string;
};

export default function SectionCard({ title, subtitle, actions, children, id, className }: Props) {
  return (
    <Paper
      id={id}
      elevation={0}
      className={`mb-6 ${className ?? ''}`}
      sx={{
        background: 'var(--surface-1)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        borderRadius: '8px',
        p: 3,
      }}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between mb-4 gap-4">
          <div>
            {title && (
              <Typography variant="h3" sx={{ mb: subtitle ? 0.5 : 0 }}>
                {title}
              </Typography>
            )}
            {subtitle && <Typography variant="body2">{subtitle}</Typography>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </Paper>
  );
}
