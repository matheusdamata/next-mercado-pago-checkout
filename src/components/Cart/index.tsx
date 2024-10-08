'use client'

import Image from 'next/image'
import { Button } from '../ui/button'
import { useState } from 'react'
import { products } from '@/constants/products'
import { formatPrice } from '@/utils/format-price'
import { getValueFromCart } from '@/utils/get-value-from-cart'
import { useRouter } from 'next/navigation'

export function Cart() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  async function handleCreateCheckout() {
    setIsLoading(true)

    const body = {
      mail: 'matheusdamatag@gmail.com',
      total_cart: getValueFromCart(products),
      // ...
    }

    try {
      const response = await fetch('/api/checkout/create', {
        method: 'POST',
        body: JSON.stringify(body),
      })

      const responseData = await response.json()

      const checkout_url = responseData?.checkout_url

      if (!checkout_url) {
        setIsLoading(false)
      }

      router.push('https://matheusdamatag.com.br')
    } catch (error) {
      console.log('Erro (create checkout):', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-[450px] rounded-lg p-4 bg-gray-100">
      <h2 className="text-xl font-bold text-center">Carrinho</h2>

      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col sm:flex-row gap-6 text-black bg-white rounded-lg p-2"
        >
          <Image
            className="w-[96px] h-[96px] mx-auto"
            src="/products/iced_espresso.png"
            alt="Expresso Gelado"
            width={96}
            height={96}
            quality={100}
          />

          <div className="flex flex-col gap-2 text-center sm:text-left">
            <div>
              <h3 className="font-bold text-lg">{product.title}</h3>
              <p className="text-gray-400 text-sm">{product.description}</p>
            </div>

            <span className="font-bold text-lg text-yellow-600">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      ))}

      <Button onClick={handleCreateCheckout} isLoading={isLoading}>
        Realizar Pedido
      </Button>
    </div>
  )
}
