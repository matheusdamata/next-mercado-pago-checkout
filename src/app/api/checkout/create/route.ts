import { Checkout } from '@/services/checkout'
import { getUser } from '@/server/actions/get-user'
import { UnableToCreateCheckout } from '@/server/errors/unable-to-create-checkout'
import { NextResponse } from 'next/server'

type CreateCheckoutRequest = {
  mail: string
  total_cart: number
  // ...
}

export async function POST(req: Request) {
  const { mail, total_cart }: CreateCheckoutRequest = await req.json()

  try {
    const user = await getUser(mail)

    if (!user)
      return new Response('User does not exists.', {
        status: 404,
      })

    const checkout = Checkout.getInstance()

    const { checkout_url } = await checkout.create({
      title: `Pedido de ${user.name} - #123`,
      price: total_cart,
    })

    return NextResponse.json({ checkout_url })
  } catch (error) {
    console.log('Erro (checkout/create):', error)

    if (error instanceof UnableToCreateCheckout)
      return new Response('Internal Server Error', {
        status: 500,
      })

    return new Response('Internal Server Error', {
      status: 500,
    })
  }
}
