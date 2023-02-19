import React from 'react'

function Delta({ delta }: { delta: number }) {
  return (
    <div
      className={`${
        delta > 0 ? 'bg-lime-400' : delta < 0 ? 'bg-orange-400' : 'bg-yellow-300'
      } rounded-full w-[125px] text-center text-black font-normal py-2 text-lg`}
    >
      {delta > 0 ? `+${delta.toFixed(2)}%` : `${delta.toFixed(2)}%`}
    </div>
  )
}

export default Delta
