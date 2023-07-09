import React, { useEffect, useState } from 'react'
import Header from '@/components/main/dashboard/Header'
import CompanyList from '@/components/main/dashboard/CompanyList'
import { useQueryCompanies } from '@/hooks/company/useQueryCompanies'
import { LoadingOverlay } from '@mantine/core'
import Company from '@/components/main/dashboard/cmopany/Company'
import { useCompaniesStore } from '@/store/Companies'
import {useLoadingStore} from "@/store/common";

const Dashboard = () => {
  const { data, status, error } = useQueryCompanies()
  const loading = useLoadingStore((state) => state.loading)

  const [detailId, setDetailId] = useState<number>(0)

  if (status === 'error') {
    // エラーメッセージの取得
    const errorMessage = error?.message || 'An error occurred.'
    return <div>Error occurred: {errorMessage}</div>
  } else {
    return (
      <div>
        {status === 'loading' || loading && <LoadingOverlay visible={true} color="violet.4" />}
        {status === 'success' && (
          <>
            {detailId === 0 ? (
              <>
                <Header />
                <CompanyList setDetailId={setDetailId} />
              </>
            ) : (
              <Company id={detailId} setDetailId={setDetailId} />
            )}
          </>
        )}
      </div>
    )
  }
}

export default Dashboard
