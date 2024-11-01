import React, { useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import circle from '../../assets/svg/circle.svg';

const TabsComp = ({ category, setSelectedCat, selectedCat }) => {
  return (
    <div className=" mt-5 relative">
      <Tabs>
        <TabList>
          <Tab onClick={() => {
            setSelectedCat({
              id: 0,
              group_name: "All"
          },);
          }}>
            <div className={selectedCat.id === 0 ? "custom-button bg-primary text-white " : "custom-button text-secondary"}>{"All"}</div>
          </Tab>
          {category && category.length > 0 && category.map((item, index) => {
            return <Tab onClick={() => {
              setSelectedCat(item);
            }}>
              <div className={selectedCat.id === item.id ? "custom-button bg-primary text-white " : "custom-button text-secondary"}>{item.group_name}</div>
            </Tab>
          })}
          {/* <Tab>
            <div className=" custom-button text-secondary  "> General</div>
          </Tab>
          <Tab>
            <div className=" custom-button text-secondary  "> Technical</div>
          </Tab>
          <Tab>
            <div className=" custom-button  text-secondary  "> Others</div>
          </Tab> */}
        </TabList>

        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
      <img
        src={circle}
        alt=""
        className=" absolute top-0  -left-10 hidden md:block "
      />
    </div>
  );
};

export default TabsComp;
