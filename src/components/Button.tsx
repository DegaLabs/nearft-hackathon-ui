import React from 'react'

interface IButtonProps {
  btnName: string
  classStyles?: string
  handleClick?: () => void
  loading?: boolean
}

// @ts-ignore
const Button = (props: IButtonProps): JSX.Element => {
  const { btnName, loading, classStyles, handleClick } = props
  return (
    <button
      type='button'
      className={`nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white
      ${classStyles}`}
      disabled={loading}
      onClick={handleClick}
    >
      {loading ? 'Loading...' : btnName }
    </button>
  )
}

export default Button
