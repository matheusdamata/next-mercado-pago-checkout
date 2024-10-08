import type { ProductProps } from '@/types/product'

export function getValueFromCart(products: ProductProps[]) {
  const total = products.reduce((acc, product) => acc + product.price, 0)

  return total
}
