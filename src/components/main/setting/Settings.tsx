import React from 'react';
import Header from "@/components/main/setting/Header";
import useStore from "@/hooks/useStore";
import {useSettingsActivePageStore} from "@/store/common";
import Account from "@/components/main/setting/Account";
import Display from "@/components/main/setting/Display";
import Help from "@/components/main/setting/Help";

const Settings = () => {
  const settingsStore = useStore(useSettingsActivePageStore, (state) => state)

  return (
    <section className='w-full' >
      <Header />

      {settingsStore?.settingsActivePage === 'Account' && <Account />}
      {settingsStore?.settingsActivePage === 'Display' && <Display />}
      {settingsStore?.settingsActivePage === 'Help' && <Help />}

    </section>
  );
};

export default Settings;
