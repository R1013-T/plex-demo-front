import React, {useEffect, useState} from 'react'
import CompanyEdit from '@/components/main/dashboard/cmopany/CompanyEdit'
import CompanyDetail from '@/components/main/dashboard/cmopany/CompanyDetail'
import CompanyHeader from '@/components/main/dashboard/cmopany/CompanyHeader'
import { useQueryCompany } from '@/utils/company/useQueryCompany'
import { LoadingOverlay } from '@mantine/core'

type Props = {
  id: number
  setDetailId: (id: number) => void
}

const Company = (props: Props) => {
  const { data, status, error } = useQueryCompany(props.id)

  const [isEdit, setIsEdit] = useState(false)

  if (status === 'error') {
    // エラーメッセージの取得
    const errorMessage = error?.message || 'An error occurred.'
    return <div>Error occurred: {errorMessage}</div>
  }

  return (
    <div>
      {status === 'loading' && <LoadingOverlay visible={true} />}
      {status === 'success' && (
        <>
          <CompanyHeader
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setDetailId={props.setDetailId}
            currentCompany={data.company}
          />
          {isEdit ? <CompanyEdit /> : <CompanyDetail data={data} />}
        </>
      )}
    </div>
  )
}

export default Company
