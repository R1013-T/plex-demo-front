import useStore from '@/hooks/useStore'
import { useActivePageStore } from '@/store/common'
import Dashboard from '@/components/main/dashboard/Dashboard'
import Charts from '@/components/main/charts/Charts'
import Notes from '@/components/main/notes/Notes'
import Users from '@/components/main/users/Users'
import Settings from '@/components/main/setting/Settings'

const Main = () => {
  const activePageStore = useStore(useActivePageStore, (state) => state)

  return (
    <article>
      {activePageStore?.activePage === 'Dashboard' && <Dashboard />}
      {activePageStore?.activePage === 'Charts' && <Charts />}
      {activePageStore?.activePage === 'Notes' && <Notes />}
      {activePageStore?.activePage === 'Users' && <Users />}
      {activePageStore?.activePage === 'Settings' && <Settings />}
    </article>
  )
}

export default Main;
