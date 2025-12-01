"use client";

import { useEffect, useState } from "react";
import { Product, ProductInput } from "@/features/products";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Props = {
  initialProduct?: Product;
  loading?: boolean;
  onSubmit: (data: ProductInput) => Promise<void> | void;
};

export function ProductForm({ initialProduct, loading, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(initialProduct.title);
      setPrice(initialProduct.price.toString());
      setCategory(initialProduct.category);
      setImage(initialProduct.image);
      setDescription(initialProduct.description);
    }
  }, [initialProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: ProductInput = {
      title,
      price: Number(price),
      category,
      image,
      description,
    };
    await onSubmit(payload);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm font-medium">Title</label>
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product title"
              className="w-full"
              size={30}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Price</label>
              <Input
                required
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="99.99"
                className="w-full"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">Category</label>
              <Input
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className="w-full"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the product..."
              rows={3}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="submit"
              disabled={loading}
              size="sm"
              className="w-full sm:w-auto"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
