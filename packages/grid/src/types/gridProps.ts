export interface gridProps {
  data: any;
  height?: string;
  columns: { field: string; header: string; width: string }[];
  loading?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalRecords?: number;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (ids: number[]) => void;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
}
