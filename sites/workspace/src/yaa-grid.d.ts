declare module "yaa-grid" {
  export interface gridProps {
    data: any;
    columns: {
      field: string;
      header: string;
      width: string;
    }[];
    resource: string;
    select?: boolean;
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
  export function Grid(props: GridProps): JSX.Element;
}
