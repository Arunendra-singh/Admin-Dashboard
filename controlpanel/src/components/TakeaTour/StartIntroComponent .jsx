/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from "react";
import introJs from "intro.js";
import "intro.js/introjs.css";

const StartIntroComponent = ({ Takeatour, PageNAME, takeatouroff }) => {
    useEffect(() => {
        let classtakeatour = "";
        if (PageNAME === "salesflyerlisting") {
            classtakeatour = "clsSales_";
        } else if (PageNAME === "salesflyeradd") {
            classtakeatour = "clsSalesCreate_";
        } else if (PageNAME === "salesflyerreport") {
            classtakeatour = "clsSalesReport_";
        } else if (PageNAME === "clsCollcetionListing") {
            classtakeatour = "clsCollcetionListing_";
        } else if (PageNAME === "clsCollcetionAddEdit") {
            classtakeatour = "clsCollcetionAddEdit_";
        } else if (PageNAME === "ProductMapping") {
            classtakeatour = "clsProductMapping_";
        } else if (PageNAME === "orderreport") {
            classtakeatour = "clsOrderReport_";
        } else if (PageNAME === "ordersamplereport") {
            classtakeatour = "clsOrderReport_";
        } else if (PageNAME === "contactusreport") {
            classtakeatour = "clsContactUsReport_";
        } else if (PageNAME === "newsletterreport") {
            classtakeatour = "clsOrderReport_";
        } else if (PageNAME === "requestquotereport") {
            classtakeatour = "clsOrderReport_";
        } else if (PageNAME === "EventThemes") {
            classtakeatour = "clsEventmanagement_";
        } else if (PageNAME === "ProductListing") {
            classtakeatour = "clsProductListing_";
        } else if (PageNAME === "v2pageconfiguratorlisting") {
            classtakeatour = "clsPageConfig_";
        } else if (PageNAME === "Industries") {
            classtakeatour = "clsIndustry_";
        } else if (PageNAME === "ProductMaterials") {
            classtakeatour = "clsProductMaterial_";
        } else if (PageNAME === "v2QuestionAnswerManagementListing") {
            classtakeatour = "clsQuestionAnswerList_";
        } else if (PageNAME === "v2QuestionAnswerManagementCreate") {
            classtakeatour = "clsQuestionAnswerCreate_";
        } else if (PageNAME === "ImprintColor") {
            classtakeatour = "clsImprintColor_";
        } else if (PageNAME === "ordermockupreport") {
            classtakeatour = "clsOrderMockupReport_";
        } else if (PageNAME === "purchaseorderreport") {
            classtakeatour = "clsPurchaseOrderReport_";
        } else if (PageNAME === "ImprintMethods") {
            classtakeatour = "clsImprintMethod_";
        }
        let h3Style = {};
        const startIntro = () => {
            let sortedJson = [...Takeatour];
            let count = 0;
            document.querySelectorAll(`[class*=${classtakeatour}], svg[class*=${classtakeatour}]`).forEach((el) => {
                const classNameMatch = el?.className?.baseVal ? el.className.baseVal.match(new RegExp(`(^|\\s)(${classtakeatour}[^\\s]*)`)) : el.className.match(new RegExp(`(^|\\s)(${classtakeatour}[^\\s]*)`));
                const classname = classNameMatch ? classNameMatch[2] : "";

                const json2 = sortedJson?.filter((item) => item?.className === classname);
                const json3 = sortedJson?.filter((item) => item?.className !== classname);

                if (json2.length > 0) {
                    if (el.style.display === "none") {
                        if (classname !== "clsSales_Create") {
                            count++;
                        }
                    } else {
                        const order = json2[0].order - count;
                        if (classname === "clsSales_Create") {
                            const element = document.querySelector("#jumbo-header .clsSales_Create");
                            if (element) {
                                element.setAttribute("data-step", order.toString());
                                element.setAttribute("data-intro", json2[0]?.message);
                            }
                        } else {
                            if (classname === "clsSales_QuickViewPopup" || classname === "clsSales_EditFlyer" || classname === "clsSales_DeleteFlyer") {
                                const targetElement = document.querySelector(".card-overlay");
                                if (targetElement) {
                                    h3Style = {
                                        opacity: 1
                                    };
                                    Object.assign(targetElement.style, h3Style);
                                }
                            }
                            el.setAttribute("data-step", order?.toString());
                            el.setAttribute("data-intro", json2[0]?.message);
                        }
                    }
                }
                sortedJson = json3;
            });

            const intro = introJs();
            intro.onexit(() => {
                const targetElement = document.querySelector(".card-overlay");
                if (targetElement) {
                    h3Style = {
                        opacity: 0
                    };
                    Object.assign(targetElement.style, h3Style);
                }
                takeatouroff(false);
            });
            intro.start();
        };

        const offIntroJs = () => {
            const intro = introJs();
            intro.exit();
        };

        startIntro();

        return () => {
            offIntroJs();
        };
    }, [Takeatour]);

    return null;
};

export default StartIntroComponent;
