import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoatCardInfoForDuplicate } from "../../../redux/DuplicateShipsTicketReducer/actionsDuplicateShipsTicket";

import InformationAboutIndividual from "../commonComponents/InformationAboutIndividual/InformationAboutIndividual";
import InformationAboutEntity from "../commonComponents/InformationAboutEntity/InformationAboutEntity";
import InfoRepresentPerson from "../commonComponents/InfoRepresentPerson/InfoRepresentPerson";
import { ProgressBar } from "react-loader-spinner";

export default function DuplShipsTicket() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const dataAppDupl = useSelector((state) => {
    const { DuplicateShipsTicketReducer } = state;
    return DuplicateShipsTicketReducer.dataAppDupl;
  });

  const personType = useSelector((state) => {
    const { DuplicateShipsTicketReducer } = state;
    return DuplicateShipsTicketReducer.personType;
  });

  useEffect(() => {
    const fetchData = () => {
      const pathArray = window.location.pathname.split("/");
      const id = pathArray[pathArray.length - 1];
      dispatch(getBoatCardInfoForDuplicate(id));
    };
    fetchData();
    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className={`d-flex flex-column align-items-center `}>
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        </div>
      ) : (
        <>
          <div>Заявление</div>
          {personType === 1 && (
            <InformationAboutIndividual
              // updateNewData={updateNewData}
              // saveKey={saveKey}
              // handleErrors={handleErrors}
              // errors={errors}
              mode={"view"}
            />
          )}
          {personType === 2 && (
            <InformationAboutEntity
              // updateNewData={updateNewData}
              // saveKey={saveKey}
              // handleErrors={handleErrors}
              // errors={errors}
              mode={"view"}
            />
          )}
          <InfoRepresentPerson mode={"viewDup"} />
        </>
      )}
    </>
  );
}
