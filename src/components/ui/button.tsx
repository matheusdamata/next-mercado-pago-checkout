import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface ButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode
  isLoading?: boolean
}

export function Button({ children, isLoading, ...rest }: ButtonProps) {
  return (
    <button
      className="w-full h-10 rounded-lg font-semibold bg-yellow-600 text-white"
      {...rest}
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mx-auto" />
      ) : (
        children
      )}
    </button>
  )
}
