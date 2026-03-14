import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback, } from "react";
import { CDN_URL, WEBSITE_GUID } from "common/utils/vars";
import selectDropDown from "../../helpers/utils/selectDropDownData";

const HtmlGenerator = ({ setting, register, getValues, setValue }) => {
    if (setting.fieldType === "textarea") {
        return (
            <>
                <label className="textarea-label label" htmlFor={setting.propsName}>{setting.propsName}</label>
                <textarea {...register} defaultValue={setting.propsValue} id={setting.propsName} aria-label={setting.propsName} className={`form-control  ${setting.disabled ? "disabled" : ""}`} />
            </>
        );
    }

    if (setting.fieldType === "input" && setting.inputType === "checkbox") {
        return <label className="checkbox-label label" htmlFor={setting.propsName}>{setting.propsName} <input {...register} defaultChecked={setting.propsValue} id={setting.propsName} aria-label={setting.propsName} className={`form-control  ${setting.disabled ? "disabled" : ""}`} type={setting.inputType} /></label>;
    }

    if (setting.fieldType === "input") {
        return (
            <>
                <label className="input-label label" htmlFor={setting.propsName}>{setting.propsName}</label>
                <input {...register} defaultValue={setting.propsValue} id={setting.propsName} aria-label={setting.propsName} className={`form-control  ${setting.disabled ? "disabled" : ""}`} type={setting.inputType} />
            </>
        );
    }

    if (setting.fieldType === "select") {
        const [selectOptions, setSelectedOption] = useState([]);
        const [selectedValue, setSelectedValue] = useState(setting.propsValue);
        const [selectedName, setSelectedName] = useState(setting.propsValue);

        const loadOptionData = async () => {
            const path = window.location.host.indexOf("localhost") > -1 ? "src/helpers/json/collectionOptionsList.json" : `${CDN_URL}/${WEBSITE_GUID}/build/js/collectionOptionsList.json`;
            const response = await fetch(path);
            const jsonData = await response.json();
            debugger;
            setSelectedName(jsonData.data.filter((s) => s.alias === setting.propsValue)[0].name);

            const objectData = await jsonData.data.reduce(
                (group, arr) => {
                    const { type } = arr;
                    // eslint-disable-next-line no-param-reassign
                    group[type] = group[type] ?? [];
                    group[type].push(arr);
                    return group;
                },
                {}
            );
            setSelectedOption(objectData);
        };

        useEffect(() => {
            if (setting.apiCallToFetchOption.includes("Category")) {
                loadOptionData();
            } else {
                const _selectDropDown = Object.fromEntries(Object.entries(selectDropDown).filter(([key]) => key.includes(setting.apiCallToFetchOption)));

                const _selectedData = _selectDropDown[`${setting.apiCallToFetchOption}`].filter((s) => setting.propsValue === s.alias)[0];

                setSelectedOption(_selectDropDown);
                setSelectedName(_selectedData.name);
                setSelectedValue(_selectedData.alias);
            }
        }, [setting]);

        const toggleSelectOption = useCallback((alias, name) => {
            setSelectedValue(alias);
            setSelectedName(name);

            // need this only when we have section name & title and change the title value if we change the section from select
            const formValues = getValues();

            if ("sectionTitle" in formValues && setting.propsName === "sectionName") {
                setValue("sectionTitle", name);
            }
        }, [selectedValue]);

        return (
            <>
                <label className="input-label label" htmlFor={setting.propsName}>{setting.propsName}</label>
                <input {...register} defaultValue={setting.propsValue} id={setting.propsName} aria-label={setting.propsName} className="form-control" type="hidden" />
                <button className="customDropdownBtn" type="button">{selectedName}</button>
                <ul className={`customDropdown mainUl ${setting.disabled ? "disabled" : ""}`}>
                    {Object.keys(selectOptions).map((group) => (
                        <li key={group} label={group}>
                            <span className="groupHeading">{group}</span>
                            <ul className="customDropdown subUl">
                                {selectOptions[group].map((opt) => <li className={`${selectedValue === opt.alias ? "selected" : ""}`} onClick={() => toggleSelectOption(opt.alias, opt.name)} key={opt.alias} value={opt.alias}>{opt.name}</li>)}
                            </ul>
                        </li>
                    ))}
                </ul>
            </>
        );
    }

    return <div>test</div>;
};

const ConfigSetting = ({ elementData = {} }) => {
    const { register, handleSubmit, formState: { errors }, reset, getValues, setValue } = useForm();
    const [animate, setAnimation] = useState(true);
    // const [style, showStyles] = useState(false);

    useEffect(() => {
        reset();
    }, [elementData]);

    const onSubmit = async (data) => {
        const iframe = document.querySelector("iframe[src*='page-viewer']");

        iframe.contentWindow.postMessage(JSON.stringify({
            type: "select-element",
            component: {
                props: {
                    ...data
                }
            },
            elemId: elementData.elemId
        }), "*");
    };

    const toggleBtn = useCallback(() => {
        setAnimation(!animate);
    }, [animate]);

    // const toggleStyle = useCallback(() => {
    //     showStyles(!style);
    // }, [style]);

    return (
        <div className="configurations">
            <strong type="button" onClick={toggleBtn} className={`toggleBtn ${animate ? "show" : ""}`}>Element Setting</strong>
            <form onSubmit={handleSubmit(onSubmit)} className="element-setting animate">
                <div className="form-section">
                    {elementData.settings.map((setting) => (
                        <div className="form-group" key={setting.propsName}>
                            <HtmlGenerator
                                setting={setting}
                                getValues={getValues}
                                setValue={setValue}
                                register={register(setting.propsName, { required: setting.required ? "field required" : "" })}
                            />
                            <small className="text-danger">{errors[`${setting.propsName}`]?.message}</small>
                        </div>
                    ))}
                </div>
                <div className="form-section-action button-wrapper">
                    <button className="btn btn-primary" type="submit">Save</button>
                    {/* <button className="btn btn-outline-primary" type="button" onClick={toggleStyle}>Add Css</button> */}
                </div>
            </form>
        </div>
    );
};

export default ConfigSetting;
