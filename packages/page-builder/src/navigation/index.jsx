import React from "react";
import { Route, Routes } from "react-router";
import PageBuilder from "~/pages/pageBuilder";
import PageViewer from "~/pages/pageViewer";

const RoutePaths = () => (
    <Routes>
        <Route path="/" element={<PageBuilder />} />
        <Route path="/page-viewer" element={<PageViewer />} />
    </Routes>
);

export default RoutePaths;
