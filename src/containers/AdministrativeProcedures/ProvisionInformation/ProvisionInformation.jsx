
import SearchBlock from "../../../components/SearchBlock/SearchBlock";
import {inputsProvisionInformation,setOptionsForInputsATE} from "../../../components/SearchBlock/inputsHeaders";
import ToolBlock from "../../../components/AdministrativeProcedures/commonComponents/ToolBlock/ToolBlock";
import SearchTable from "../../../components/SearchTable/SearchTable";
import {PRIVISION_INFORMATION_COLUMNS} from "../../../components/SearchTable/TablesColumns";
import {useSelector} from "react-redux";
import {useState} from "react";

function ProvisionInformation(props) {
    const [statementId, setStatementId] = useState(null);
    const dataOptionsForSelectATE = useSelector((state) => {
        const { dictionaryReducer } = state;
        return dictionaryReducer.ateLibrary;
    });
    const dataOptionsForSelectATEValidated = [];
    dataOptionsForSelectATE.forEach((item) => {
        dataOptionsForSelectATEValidated.push({
            value: item.sctId,
            label: item.sctName,
            key: "section",
        });
    });
    setOptionsForInputsATE(dataOptionsForSelectATEValidated, document.location.pathname.slice(1));
    const handleStatementId = (value) => {
        setStatementId(value);
    };
    const dataStateProvisionInf = useSelector((state) => {
        const { provisionInformationReducer } = state;
        return provisionInformationReducer.data;
    });
    return (
        <>
            <h2>Предоставление информации о судне</h2>
            <SearchBlock inputsHeaders={Object.values(inputsProvisionInformation)} />
            {/*<ToolBlock*/}
            {/*    // addBtnDis={true}*/}
            {/*    // id={statementId}*/}
            {/*    // data={dataStateRegInfChanges}*/}
            {/*    // appStatusId={statementId?dataStateRegInfChanges.find(el=>el.id.toString()===statementId).statusId:undefined}*/}
            {/*/>*/}
            <SearchTable
                setId={handleStatementId}
                headerColumns={PRIVISION_INFORMATION_COLUMNS}
                dataFromState={dataStateProvisionInf}
            />
        </>
    );
}

export default ProvisionInformation;