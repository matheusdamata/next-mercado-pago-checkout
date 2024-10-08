import { randomUUID } from 'node:crypto'
import { Preference } from 'mercadopago'
import { env } from '@/env'
import { UnableToCreateCheckout } from '@/server/errors/unable-to-create-checkout'

type CreateCheckout = {
  title: string
  price: number
}

export class Checkout {
  private static instance: Checkout
  private preference: Preference

  constructor() {
    this.preference = new Preference({
      accessToken: env.MP_ACCESS_TOKEN,
      options: {
        timeout: 5000,
      },
    })
  }

  public static getInstance(): Checkout {
    if (!Checkout.instance) Checkout.instance = new Checkout()

    return Checkout.instance
  }

  async create({ title, price }: CreateCheckout) {
    const referenceID = randomUUID()

    const body = {
      items: [
        {
          id: '12345',
          title,
          unit_price: price,
          quantity: 1,
        },
      ],
      external_reference: referenceID,
      back_urls: {
        success: env.MP_SUCCESS_PAGE,
        failure: env.MP_FAILURE_PAGE,
        pending: env.MP_PENDING_PAGE,
      },
      notification_url: env.MP_WEBHOOK_URL,
    }

    const checkout = await this.preference.create({
      body,
    })

    if (!checkout) throw new UnableToCreateCheckout()

    const checkout_url = checkout?.init_point

    return {
      checkout_url,
    }
  }
}
