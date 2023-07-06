import useStore from '@/hooks/useStore'
import { useActivePageStore } from '@/store/common'
import Dashboard from '@/components/main/dashboard/Dashboard'
import Charts from '@/components/main/charts/Charts'
import Notes from '@/components/main/notes/Notes'
import Users from '@/components/main/users/Users'
import Settings from '@/components/main/setting/Settings'
import Trash from "@/components/main/Trash/Trash";

const Main = () => {
  const activePageStore = useStore(useActivePageStore, (state) => state)

  return (
    <div className='w-full h-screen-main overflow-hidden' >
      {activePageStore?.activePage === 'Dashboard' && <Dashboard />}
      {activePageStore?.activePage === 'Charts' && <Charts />}
      {activePageStore?.activePage === 'Notes' && <Notes />}
      {activePageStore?.activePage === 'Users' && <Users />}
      {activePageStore?.activePage === 'Trash' && <Trash />}
      {activePageStore?.activePage === 'Settings' && <Settings />}
    </div>
  )
}

export default Main;
