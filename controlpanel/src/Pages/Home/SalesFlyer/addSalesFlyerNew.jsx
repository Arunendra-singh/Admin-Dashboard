// import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { useQueryGetSalesFlyer } from "common/components/graphQL/queries/Sales/useQueryGetSalesFlyer";

// import { useQueryGetCustomersById } from "../../../../graphQL/queries/Customer/useQueryGetCustomerById";

import AddSalesFlyer from "../../../components/SalesCard/AddSalesFlyer";
// import AddSalesFlyer from "~/components/SalesCard/AddSalesFlyer";

const AddSalesFlyerNew = () => {
    const location = useLocation();

    const { data: getCustomerById } = useQuery(useQueryGetSalesFlyer, {
        variables: {
            filter: { salesFlyerGuid: { eq: location?.state?.salesFlyerId } }
        }
    });
    return location?.state?.salesFlyerId !== "" ? getCustomerById !== undefined && getCustomerById?.salesFlyers?.items?.length > 0 && <AddSalesFlyer salesFlyerEditData={getCustomerById.salesFlyers.items[0]} isEdit={true} /> : <AddSalesFlyer isEdit={false} />;
    // return location?.search !== "" ? <>{getCustomerById !== undefined && getCustomerById?.salesFlyers?.items?.length > 0 && <AddSalesFlyer salesFlyerEditData={getCustomerById?.salesFlyers?.items?.[0]} isEdit={true} />}</> : <AddSalesFlyer isEdit={false} />;
    // return location?.search !== "" ? <>{getCustomerById !== undefined && getCustomerById?.salesFlyers?.items?.length > 0 && <AddSalesFlyer salesFlyerEditData={getCustomerById?.salesFlyers?.items?.[0]} isEdit={true} />}</> : <AddSalesFlyer isEdit={false} />;
};

export default AddSalesFlyerNew;
