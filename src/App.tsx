import { useState } from 'react'
import Delta from './Components/Delta'
import { kFormatter } from './Utils/CurrencyFormatter'
import employeeData from './EmployeeData.json'

type EmployeeType = {
  firstName: string
  lastName: string
  location: string
  prevSalary: string
  currSalary: string
  org: string
}
type SalaryType = {
  salary: number
  location: string
  delta: number
}
function App() {
  const [activeToggle, setActiveToggle] = useState('table')
  let distinctLocations: string[] = []
  let data: SalaryType[] = []
  let mean = 0
  employeeData.forEach((employee) => {
    if (!distinctLocations.includes(employee.location)) {
      distinctLocations.push(employee.location)
    }
    mean += Number(employee.currSalary.replace('$', ''))
  })

  mean = mean / employeeData.length

  distinctLocations.forEach((distinctLocation) => {
    let employees = employeeData.filter((employee) => {
      return employee.location === distinctLocation
    })
    let totalCurrent = 0
    let totalPrev = 0
    employees.forEach((employee) => {
      totalCurrent += Number(employee.currSalary.replace('$', ''))
      totalPrev += Number(employee.prevSalary.replace('$', ''))
    })
    let avgSalary = totalCurrent / employees.length

    let delta = ((totalCurrent - totalPrev) * 100) / totalCurrent
    data.push({
      salary: avgSalary,
      location: distinctLocation,
      delta: delta,
    })
  })

  return (
    <div className='mt-6 mx-6'>
      <div className='text-3xl text-center'>Employees Salary Data</div>
      <div className='flex items-center justify-end'>
        <div className='inline-flex shadow-md hover:shadow-lg focus:shadow-lg' role='group'>
          <button
            type='button'
            className='rounded-l inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none active:bg-blue-800'
            onClick={() => setActiveToggle('table')}
          >
            Table
          </button>
          <button
            type='button'
            className='rounded-r inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none active:bg-blue-800'
            onClick={() => setActiveToggle('chart')}
          >
            Chart
          </button>
        </div>
      </div>

      {activeToggle === 'table' && (
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
      )}

      {activeToggle === 'chart' && <div>Chart</div>}
    </div>
  )
}

export default App
