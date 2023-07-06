import React, { useEffect, useState } from 'react'
import Header from '@/components/main/dashboard/Header'
import CompanyList from '@/components/main/dashboard/CompanyList'
import { useQueryCompanies } from '@/utils/company/useQueryCompanies'
import { LoadingOverlay } from '@mantine/core'
import Company from "@/components/main/dashboard/cmopany/Company";

const Dashboard = () => {
  const { data, status, error } = useQueryCompanies()

  const [detailId, setDetailId] = useState<number>(0)

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
          {detailId === 0 ? (
            <>
              <Header />
              <CompanyList companies={data.data} setDetailId={setDetailId} />
            </>
          ) : (
            <Company id={detailId} setDetailId={setDetailId} />
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard
