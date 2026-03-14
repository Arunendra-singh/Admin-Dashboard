/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from "react";
import "./Toggleswitch.scss";
import { useQuery } from "@apollo/client"; // Assuming Apollo Client for GraphQL
import { useQueryGetGloblesetting } from "common/components/graphQL/queries/Sales/useQueryGetGloblesetting";
import Store from "~/Store";
import StartIntroComponent from "../TakeaTour/StartIntroComponent ";

export default function ToggleSwitch({ PageNAME }) {
    const [isOn, setIsOn] = useState(false);
    const [resources, setResource] = Store.useStore((store) => store?.resources);
    const [takeatourdata, setTakeatour] = Store.useStore((store) => store?.takeatourdata);
    const [globalsetting, setglobalsetting] = Store.useStore((store) => store?.globalsetting);
    const { data } = useQuery(useQueryGetGloblesetting, {
        variables: {
            pageName: PageNAME
        }
    });
    useEffect(() => {
        // const fetchData = async () => {
        //     const resp = await refetch();
        if (data?.getResourcesGlobalSetting?.data?.resources !== undefined) {
            const updateResource = { ...resources };
            updateResource.resources = data?.getResourcesGlobalSetting?.data?.resources.reduce((acc, item) => {
                acc[item?.key] = item?.value;
                return acc;
            }, {});
            const updateglobalsetting = { ...globalsetting };
            updateglobalsetting.globalsetting = data?.getResourcesGlobalSetting?.data?.globalSettings.reduce((acc, item) => {
                acc[item?.key] = item?.value;
                return acc;
            }, {});
            setglobalsetting(updateglobalsetting);
            // updateResource.resources = data?.getResourcesGlobalSetting?.data?.resources;
            const updatedata = { ...takeatourdata };
            updatedata.takeatourdata = data?.getResourcesGlobalSetting.data.ftux;
            setTakeatour(updatedata);
            setResource(updateResource);
        }
        // };

        // fetchData();
    }, [data, setResource]);

    // const [isactive, setIsActive] = useState(false);

    // const toggleActive = () => {
    //     setIsActive((prev) => !prev);
    // };
    const takeatouroff = (e) => {
        setIsOn(e);
        setTakeatour(null);
        // toggleActive();
    };

    return (
        <div className="toggle-button">
            <label className={`slider ${isOn ? "on" : ""}`}>
                <input type="checkbox" onChange={() => setIsOn((prev) => !prev)} checked={isOn} required />
                <div className="sort" />
            </label>
            {isOn && <StartIntroComponent Takeatour={takeatourdata} PageNAME={PageNAME} takeatouroff={takeatouroff} />}
        </div>
    );
}
