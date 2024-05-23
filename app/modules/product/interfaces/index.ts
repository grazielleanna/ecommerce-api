import { MultipartFile } from "@adonisjs/core/bodyparser";

type ProductData = {
    title: string;
    description: string;
    price: number;
    discountPercentage?: number | null;
    rating: number;
    stock: number;
    category_id: number;
    thumbnail: MultipartFile;
    images: MultipartFile;
    is_active: boolean;
}

export type {
    ProductData
}