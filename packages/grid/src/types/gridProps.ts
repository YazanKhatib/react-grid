import { ReactNode } from 'react';

export interface gridProps {
  data: any;
  color?: string;
  height?: string;
  variant?: string;
  search?: boolean;
  jsonExport?: boolean;
  columns: { field: string; header: string; width: string }[];
  loading?: boolean;
  pageNumber?: number;
  pageSize?: number;
  totalRecords?: number;
  rtl?: boolean;
  viewIcon?: ReactNode;
  editIcon?: ReactNode;
  deleteIcon?: ReactNode;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (ids: number[]) => void;
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
}
