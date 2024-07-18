import React from 'react'
import Header from '../../../Components/Counsellor/Header/Header'
import SideNavBar from '../../../Components/Counsellor/SideNavBar/SideNavBar'
import DomainList from '../../../Components/Counsellor/Domain/ListDomain'

const DomainListPage = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <SideNavBar />
        <DomainList />
      </div>
    </>
  )
}

export default DomainListPage