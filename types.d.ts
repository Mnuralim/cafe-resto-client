interface IMenu {
  id: string;
  name: string;
  image: string;
  price: number;
  status: boolean;
  admin_id: string;
  category_id: string;
  created_at: string;
  updated_at: string;
}

interface Filters {
  category: string;
}

interface Meta {
  totalMenus: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  filters: Filters;
}

interface MenuApiResponse {
  status: string;
  message: string;
  data: IMenu[];
  meta: Meta;
}

interface ICategory {
  id: string;
  name: string;
}
