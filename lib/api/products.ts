const API_URL = "https://fakestoreapi.com/products";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type ProductInput = Omit<Product, "id">;

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }
  return res.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(API_URL);
  return handleResponse<Product[]>(res);
}

export async function getProduct(id: string | number): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`);
  return handleResponse<Product>(res);
}

export async function createProduct(data: ProductInput): Promise<Product> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Product>(res);
}

export async function updateProduct(
  id: string | number,
  data: ProductInput
): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Product>(res);
}

export async function deleteProduct(id: string | number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Failed to delete");
  }
}
