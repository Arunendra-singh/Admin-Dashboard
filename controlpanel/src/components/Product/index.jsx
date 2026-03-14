import { useState } from "react";
import ProductInfo from "./ProductInfo";
import styles from "./ProductManagement.module.scss";
import Variations from "./Variations";
import PricingTable from "./PricingTable";
import ImprintMethods from "./ImprintMethods";
import Seo from "./Seo";
import Attributes from "./Attributes";

const ProductManagement = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = ["Product Info", "Variations (SKUs)", "Pricing Table", "Imprint Methods", "Attributes", "SEO", "Additional Info"];
    return (
        <div className={styles?.ProductManagement}>
            <div className="tabs-container">
                <div className="tabs">
                    {tabs?.map((tab, index) => (
                        <div key={`${tab}_data`} className={`tab ${activeTab === index ? "active" : ""}`} onClick={() => setActiveTab(index)}>
                            {index + 1}. {tab}
                        </div>
                    ))}
                </div>
                <div className="tabsData">
                    <div className={`productinfo ${tabs[activeTab] === "Product Info" ? "" : "d-none"}`}>
                        <ProductInfo />
                    </div>
                    <div className={`productinfo Variations ${tabs[activeTab] === "Variations (SKUs)" ? "" : "d-none"}`}>
                        <Variations />
                    </div>
                    <div className={`PricingTable ${tabs[activeTab] === "Pricing Table" ? "" : "d-none"}`}>
                        <PricingTable />
                    </div>
                    <div className={`PricingTable ${tabs[activeTab] === "Imprint Methods" ? "" : "d-none"}`}>
                        <ImprintMethods />
                    </div>
                    <div className={`PricingTable ${tabs[activeTab] === "SEO" ? "" : "d-none"}`}>
                        <Seo />
                    </div>
                    <div className={`Attributes ${tabs[activeTab] === "Attributes" ? "" : "d-none"}`}>
                        <Attributes />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;
