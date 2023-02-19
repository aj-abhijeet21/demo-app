import { useEffect, useMemo, useRef, useState } from 'react'
import employeeData from './EmployeeData.json'
import { SalaryType } from './Utils/Types'
import Chart from './Components/Chart'
import Table from './Components/Table'

function App() {
  const [activeToggle, setActiveToggle] = useState('table')
  const [filterText, setFilterText] = useState<String>('')
  const [data, setData] = useState<SalaryType[]>([])
  const filterRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let result: SalaryType[] = []
    let distinctLocations: string[] = []
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
      result.push({
        salary: avgSalary,
        location: distinctLocation,
        delta: delta,
      })
    })

    setData(result)
  }, [])

  let filteredData = useMemo(() => {
    if (filterText === '') return data
    return data.filter((item) => item.location.toLowerCase().includes(filterText.toLowerCase()))
  }, [data, filterText])

  function handleReset() {
    setFilterText('')
    if (filterRef.current) filterRef.current.value = ''
  }

  return (
    <div className='mt-6 mx-6'>
      <div className='text-3xl text-center'>Employees Salary Data</div>
      <div className='flex items-center justify-between'>
        <div className='flex justify-start'>
          <input
            ref={filterRef}
            type='text'
            className='form-control w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded'
            placeholder='Enter text to search...'
            onChange={(e) => setFilterText(e.currentTarget.value)}
          />
          <button
            type='button'
            className=' px-6 py-2.5 bg-blue-600 text-white font-medium text-xs uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none active:bg-blue-800'
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
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

      {activeToggle === 'table' && <Table data={filteredData} />}

      {activeToggle === 'chart' && <Chart data={filteredData} />}
    </div>
  )
}

export default App
