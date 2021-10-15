import React, { useState, useEffect } from 'react';
import { Redirect, Link, Route, Switch } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import nasaLogoSrc from './media/nasa-logo.svg';
import { TABS, DEFAULT_TAB_INDEX } from './constants';
import { Heading, NasaLogo, StyledTab } from './styles/styles';

export const App = () => {
  const [selectedTab, setSelectedTab] = useState(DEFAULT_TAB_INDEX);
  const path = window.location.hash.slice(1);

  useEffect(() => {
    const selectedTab = TABS.findIndex(
      tab => tab.route === path || tab.redirectRoute === path
    );
    setSelectedTab(selectedTab === -1 ? DEFAULT_TAB_INDEX : selectedTab);
  }, [path]);

  const handleTabChange = ({ target: { text } }) =>
    setSelectedTab(TABS.findIndex(tab => tab.label === text));

  return (
    <>
      <Heading>
        <h1>Images from NASA</h1>
        <NasaLogo src={nasaLogoSrc} />
      </Heading>
      <Tabs centered onChange={handleTabChange} value={selectedTab}>
        {TABS.map(tab => (
          <StyledTab
            label={tab.label}
            component={Link}
            to={tab.route}
            key={tab.label}
            styleprops={{
              isActive: tab.route === path || tab.redirectRoute === path,
            }}
          />
        ))}
      </Tabs>
      <Switch>
        {TABS.map(tab => (
          <Route path={tab.route} key={tab.route}>
            <tab.component selectedTab={selectedTab} tabValue={tab.value} />
          </Route>
        ))}
        <Redirect to={TABS[DEFAULT_TAB_INDEX].route} />
      </Switch>
    </>
  );
};
