import "@mantine/core/styles.css";
import { Tabs, FloatingIndicator } from "@mantine/core";
import CropTable from "./Table/CropTable";
import BarChart from "./Charts/BarChart";
import data from "../data/IndiaAgroDataset.json";
import classes from "./demo.module.css";
import { useState } from "react";

const Header = () => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>("1");
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});

  const setControlRef = (val: string) => (node: HTMLButtonElement | null) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs variant="pills" value={value} onChange={setValue}>
      <Tabs.List className={classes.list}>
        <Tabs.Tab value="1" className={classes.tab}>
          Table Component
        </Tabs.Tab>
        <Tabs.Tab value="2" className={classes.tab}>
          Chart Component
        </Tabs.Tab>
        <FloatingIndicator
          target={value ? controlsRefs[value] : null}
          parent={rootRef}
          className={classes.indicator} />
      </Tabs.List>

      <Tabs.Panel value="1">
        <CropTable data={data} />
      </Tabs.Panel>
      <Tabs.Panel value="2">
        <BarChart data={data} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default Header;
