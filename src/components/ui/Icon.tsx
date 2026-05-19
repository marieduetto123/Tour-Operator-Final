type Props = { name: string; className?: string; style?: React.CSSProperties };

export function Icon({ name, className = '', style }: Props) {
  return <span className={`material-icons ${className}`} style={style}>{name}</span>;
}
