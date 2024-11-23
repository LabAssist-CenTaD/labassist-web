import "./FilterLabel.css";

interface FilterLabelProps {
  Icon: React.ElementType;
  label: string;
  color: string;
}

export const FilterLabel = ({
  Icon,
  label,
  color,
}: FilterLabelProps): JSX.Element => {
  return (
    <div className="filter-label" style={{ backgroundColor: color }}>
      <Icon size={12} variant="Bold" color="rgba(0, 33, 57, 1)" />
      <div className="text-wrapper">{label}</div>
    </div>
  );
};
