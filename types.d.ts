interface Product {
  id: number;
  name: string;
  description: string;
  cover_image: string;
  images: string[];
  available_colors: string[];
  available_sizes: string[];
  release_year: string;
  price: number;
  brand?: {
    id: number,
    image: string
    name: string
  }
}

interface PaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
  links: { url: string | null; label: string; active: boolean }[];
}

interface ProductsResponse {
  data: Product[];
  links: PaginationLinks;
  meta: PaginationMeta;
}
