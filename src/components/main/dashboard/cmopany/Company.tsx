import React, {useEffect} from 'react'

type Props = {
  id: number
}

const CompanyDetail = (props:Props) => {
  useEffect(() => {
    console.log(props.id)
  },[])

  return <div>{props.id}</div>
}

export default CompanyDetail
