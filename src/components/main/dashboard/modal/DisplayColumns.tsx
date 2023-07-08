import { Checkbox } from '@mantine/core'
import useStore from '@/hooks/useStore'
import { useDisplayCompaniesColumnsStore } from '@/store/Companies'

const DisplayColumns = () => {
  const displayColumns = useStore(
    useDisplayCompaniesColumnsStore,
    (state) => state
  )
  const companyColumnsScript = [
    'id',
    'code',
    'name',
    'nameKana',
    'listingStatus',
    'postalCode',
    'address',
    'phone',
    'representativeName',
    'representativeNameKana',
    'revenue_2020',
    'revenue_2021',
    'revenue_2022',
    'profit_2020',
    'profit_2021',
    'profit_2022',
    'createdAt',
    'updatedAt',
  ]

  return (
    <Checkbox.Group
      value={displayColumns?.displayCompaniesColumns}
      onChange={displayColumns?.setDisplayCompaniesColumns}
    >
      {companyColumnsScript.map((companyColumn) => (
        <Checkbox
          key={companyColumn}
          mb="md"
          value={companyColumn}
          label={companyColumn}
        />
      ))}
    </Checkbox.Group>
  )
}

export default DisplayColumns
