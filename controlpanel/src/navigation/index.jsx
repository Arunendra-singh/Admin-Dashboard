/* eslint-disable import/no-named-as-default-member */
import React from "react";
import { Route, Routes } from "react-router-dom";
// import { COOKIE_DETAILS } from "common/utils/vars";
import OrderCatalogReport from "~/Pages/Reports/Order/OrderCatalogReport";
import EventThemeListing from "~/Pages/EventTheme";
import ProductManagement from "~/components/Product";
import PageConfigurator from "~/Pages/PageConfigurator";
import EditPageConfigurator from "~/Pages/PageConfigurator/EditPageConfigurator";

import IndustriesListing from "~/Pages/industries";
import SeoTag from "~/components/layout/seotag";
import ProductMaterialListing from "~/Pages/productMaterial";
import OrderMockupReport from "~/Pages/Reports/Order/OrderMockupReport";
import ImprintColorListing from "~/Pages/imprintColor";
import ImprintMethodListing from "~/Pages/ImprintMethod";
import AddSalesFlyer from "../components/SalesCard/AddSalesFlyer";
// eslint-disable-next-line import/no-named-as-default
import SalesflyerReport from "../components/SalesFlyerReport/index";

import HomeControl from "../Pages/Home/index";
import AddSalesFlyerNew from "../Pages/Home/SalesFlyer/addSalesFlyerNew";
import Layout from "../components/layout/layout";
import AddEditCollection from "../Pages/Collection/AddEditCollection";
import Collection from "../Pages/Collection";
import ProductMapping from "../Pages/Collection/ProductMapping/Index";
import OrderReport from "../Pages/Reports/Order/OrderReport";
import RequestQuoteReport from "../Pages/Reports/Order/RequestQuoteReport";
import OrderSampleReport from "../Pages/Reports/Order/OrderSampleReport";
import ContactUsReport from "../Pages/Reports/Order/ContactUsReport";
import NewsLetterReport from "../Pages/Reports/Order/NewsLetterReport";
import ProductControl from "../Pages/Product/index";
import PurchaseOrderReport from "../Pages/Reports/Order/PurchaseOrderReport";
import PageBuilder from "../Pages/PageConfigurator/pageBuilder";
import PageViewer from "../Pages/PageConfigurator/pageViewer";
import PageLayout from "../Pages/PageConfigurator/pageLayout";
import QuestionAnswerManagement from "../Pages/QuestionAnswer/index";
import AddEditQAManagement from "../Pages/QuestionAnswer/ManageQuestions/index";

const RoutePaths = () => (
    <>
        <SeoTag />
        <Routes>
            <Route element={<Layout />}>
                <Route path="/v2/SalesFlyer" element={<HomeControl />} />
                <Route path="/v2/SalesFlyer/Edit/:salesFlyerGuid" element={<AddSalesFlyerNew />} />
                <Route path="/v2/SalesFlyer/Create" element={<AddSalesFlyer />} />
                <Route path="/v2/SalesFlyerEmail/SalesFlyerReport" element={<SalesflyerReport />} />
                <Route path="/v2/Collection/GetAllCollection" element={<Collection />} />
                <Route path="/v2/Collection/Create" element={<AddEditCollection />} />
                <Route path="/v2/Collection/Edit/:collectionGuid" element={<AddEditCollection />} />
                <Route path="/v2/Collection/AssignProducts/:collectionGuid" element={<ProductMapping />} />
                <Route path="/v2/OrderCatalog/OrderCatalogReport" element={<OrderCatalogReport />} />
                <Route path="/v2/Order/OrderReport" element={<OrderReport />} />
                <Route path="/v2/Order/RequestQuoteReport" element={<RequestQuoteReport />} />
                <Route path="/v2/Order/OrderSampleReport" element={<OrderSampleReport />} />
                <Route path="/v2/ContactUs/ContactUsReport" element={<ContactUsReport />} />
                <Route path="/v2/NewsLetter/NewsLetterReport" element={<NewsLetterReport />} />
                <Route path="/v2/EventThemes/GetView" element={<EventThemeListing />} />
                <Route path="/v2/Product/AdminIndex" element={<ProductControl />} />
                <Route path="/v2/Product/Create" element={<ProductManagement />} />
                <Route path="/v2/PageConfigurator" element={<PageConfigurator />} />
                <Route path="/v2/PageConfigurator/Edit" element={<EditPageConfigurator />} />
                <Route path="/v2/PageConfigurator/Create" element={<PageBuilder />} />
                <Route path="/v2/PageConfigurator/layout" element={<PageLayout />} />
                <Route path="/v2/PageViewer" element={<PageViewer />} />
                <Route path="/v2/Industries/GetView" element={<IndustriesListing />} />
                <Route path="/v2/ProductMaterials/index" element={<ProductMaterialListing />} />
                <Route path="/v2/Order/PurchaseOrderReport" element={<PurchaseOrderReport />} />
                <Route path="/v2/Order/MockUpReport" element={<OrderMockupReport />} />
                <Route path="/v2/QuestionAnswer/Index" element={<QuestionAnswerManagement />} />
                <Route path="/v2/QuestionAnswer/Create" element={<AddEditQAManagement />} />
                <Route path="/v2/QuestionAnswer/Edit/:questionGuid" element={<AddEditQAManagement />} />
                <Route path="/v2/ImprintColor" element={<ImprintColorListing />} />
                <Route path="/v2/ImprintMethod/GetView" element={<ImprintMethodListing />} />
            </Route>
        </Routes>
    </>
);

export default RoutePaths;
