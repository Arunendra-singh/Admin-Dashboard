/* eslint-disable react/no-array-index-key */
import { useState, useEffect, createElement, Fragment, useCallback } from "react";
import { UpdateObjectByKeyValue } from "common/utils";
import PageContainer from "~/hoc/PageContainer";

import ProductSection from "~/components/elements/ProductSection";
import BuilderBreadCrumb from "~/components/elements/BuilderBreadCrumb";
import DraggableRowContainer from "~/components/builder/DraggableRowContainer";
import DraggableParent from "~/components/builder/DraggableParent";
import ComponentSelector from "~/components/builder/ComponentSelector";
import Heading from "~/components/basic/Heading";
import Link from "~/components/basic/Link";
import Button from "~/components/basic/Button";
import Image from "~/components/basic/Image";
import ButtonWithIcon from "~/components/basic/ButtonWithIcon";

import Hello from "~/components/elements/Hello";
import Dummy from "~/components/elements/Dummy";

import { configuration } from "~/helpers/json/config.json";

import "../../styles/pages/index.scss";
import ConfigWrapper from "../../components/builder/ConfigWrapper";
import AddRowToPage from "../../components/builder/AddRowToPage";

const Components = {
    Hello,
    Dummy,
    PageContainer,
    BuilderBreadCrumb,
    DraggableRowContainer,
    DraggableParent,
    ComponentSelector,
    Heading,
    Image,
    Link,
    Button,
    ButtonWithIcon,
    ProductSection
};

const ConfigElem = ({ type, element, props = {}, children = [], content = "", elemId = "", elementConfig = [] }) => {
    // console.log(type, element);
    if (type === "html") {
        const _elemConfig = elementConfig;
        if (elementConfig.length > 0) {
            _elemConfig.forEach((elem) => {
                // eslint-disable-next-line no-param-reassign
                elem.propsValue = props[`${elem.propsName}`];
            });
        }

        return (
            <ConfigWrapper type={type} elemId={elemId} elementConfig={_elemConfig}>
                {
                    createElement(
                        element,
                        { id: elemId },
                        [
                            props.content,
                            children.map((c, i) => <ConfigElem key={i} {...c} />)
                        ]
                    )
                }
                <style>{props.style}</style>
            </ConfigWrapper>
        );
    }
    if (type === "jsx") {
        const _elemConfig = elementConfig;
        if (elementConfig.length > 0) {
            _elemConfig.forEach((elem) => {
                // eslint-disable-next-line no-param-reassign
                elem.propsValue = props[`${elem.propsName}`];
            });
        }

        if (element === "ComponentSelector" || element === "DraggableRowContainer" || element === "DraggableParent") {
            return createElement(
                Components[element],
                (element !== "DraggableParent") ? { ...props, elemId } : props,
                children.map((c, i) => <ConfigElem key={i} {...c} />)
            );
        }

        return (
            <ConfigWrapper type={type} elemId={elemId} elementConfig={_elemConfig}>
                {createElement(
                    Components[element],
                    { ...props, elemId },
                    children.map((c, i) => <ConfigElem key={i} {...c} />)
                )}
            </ConfigWrapper>
        );
    }
    if (type === "text") {
        return (
            <ConfigWrapper type={type} elemId={elemId}>
                {content}
            </ConfigWrapper>
        );
    }
    if (type === "root") {
        return createElement(
            Fragment,
            props,
            children.map((c, i) => <ConfigElem key={i} {...c} />)
        );
    }
    return (
        <ConfigWrapper type={type} elemId={elemId}>
            {createElement(Fragment)}
        </ConfigWrapper>
    );
};

const PageViewer = () => {
    const isIframe = window.self !== window.top;
    if (!isIframe) {
        document.body.classList.add("preview-mode");
        // window.location.href = window.location.origin;
    }
    // console.log({ isIframe });

    const [config, setConfig] = useState(configuration);

    const updateConfig = (data) => {
        const _config = { ...config };
        UpdateObjectByKeyValue(_config, "elemId", data.elemId, data.component); // update object with key "c" and value 123 with new object { c: 456, x: "new value" }
        setConfig(_config);
    };

    const addNewRowToConfig = useCallback((newConfigData) => {
        const _config = { ...config };
        _config.children[0].children.push(newConfigData); // will push the new config in DraggableParent children object
        setConfig(_config);
    }, [config]);

    const deleteRowFromConfig = useCallback((elemId) => {
        const _config = { ...config };
        const index = _config.children[0].children.findIndex((datat) => datat.elemId === elemId);
        _config.children[0].children.splice(index, 1);
        setConfig(_config);
    }, [config]);

    const onMessageHandler = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "select-element") {
            updateConfig(data);
        }

        if (data.type === "remove-element") {
            const _data = {
                component: {
                    type: "jsx", element: "ComponentSelector", elemId: data.elemId
                },
                elemId: data.elemId
            };
            updateConfig(_data);
        }

        if (data.type === "remove-row") {
            deleteRowFromConfig(data.elemId);
        }
    };

    useEffect(() => {
        window.addEventListener("message", onMessageHandler, false);

        return () => {
            window.removeEventListener("message", onMessageHandler);
        };
    }, []);

    return (
        <>
            <ConfigElem {...config} />
            <AddRowToPage addNewRowToConfig={addNewRowToConfig} />
        </>
    );
};

export default PageViewer;
