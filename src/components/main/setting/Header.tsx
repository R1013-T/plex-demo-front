import { Container, Group } from '@mantine/core'
import useStore from '@/hooks/useStore'
import { useSettingsActivePageStore } from '@/store/common'

const Header = () => {
  const settingsStore = useStore(useSettingsActivePageStore, (state) => state)

  const settings = ['Account', 'Display', 'Help']

  const settingItems = settings.map((item, index) => (
    <h3
      key={index}
      className={` mx-3 my-2 rounded px-2 py-1.5 text-sm font-medium tracking-wider ${
        settingsStore?.settingsActivePage === item &&
        'bg-brand-primary/30 text-white'
      }`}
      onClick={() => settingsStore?.setSettingsActivePage(item)}
    >
      {item}
    </h3>
  ))

  return (
    <section className="w-full shadow-2xl">
      <Group spacing={0} position="left" className="w-full p-0">
        {settingItems}
      </Group>
    </section>
  )
}

export default Header
