import { users } from '@/constants/users'

export async function getUser(mail: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const user = users.find((user) => user.mail === mail)

  return user
}
