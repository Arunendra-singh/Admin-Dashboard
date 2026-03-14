import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetQuestionData } from "common/hooks/react/api";
import AddEditQuestion from "../../../components/QuestionAnswer/addEditQuestion";

const AddEditQAManagement = () => {
    const location = useLocation();
    const guid = location?.pathname?.split("/")?.pop();
    const isEdit = guid !== null && guid !== "" && guid !== undefined && guid?.toLowerCase() !== "create";
    const [editedQaData, setQuestionAnswerData] = useState([]);
    const { data: GetQuestionsData } = useGetQuestionData(guid);

    useEffect(() => {
        if (GetQuestionsData !== undefined) {
            setQuestionAnswerData(GetQuestionsData);
        }
    }, [GetQuestionsData]);

    return <AddEditQuestion isEdit={isEdit} questionAnswerGuid={guid} QuestionData={editedQaData} />;
};
export default AddEditQAManagement;
