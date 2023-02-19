import React from 'react'
import { kFormatter } from '../Utils/CurrencyFormatter'
import { SalaryType } from '../Utils/Types'
import Delta from './Delta'

function Table({ data }: { data: SalaryType[] }) {
  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='mx-auto'>
              <thead className='border-b'>
                <tr>
                  <th className='text-lg font-medium text-gray-900 px-6 py-4 text-left w-[200px]'>
                    <h6>Location</h6>
                  </th>
                  <th className='text-lg font-medium text-gray-900 px-6 py-4 text-center w-[200px]'>
                    <h6>Salary</h6>
                  </th>
                  <th className='text-lg font-medium text-gray-900 px-6 py-4 text-center w-[200px]'>
                    <h6>Delta</h6>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.location}>
                    <td className='text-lg text-left text-gray-900 font-normal px-6 py-4 whitespace-nowrap'>
                      <h6>{row.location}</h6>
                    </td>
                    <td className='text-lg text-center text-gray-900 font-normal px-6 py-4 whitespace-nowrap'>
                      <h6>{kFormatter(row.salary)}</h6>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Delta delta={row.delta} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
