// single selection
// multiple selection
import { useState } from "react";
import data from "./data";

export default function Accordian() {
  console.log("data1", data);
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    console.log("currId", getCurrentId);
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);

    console.log("get1", getCurrentId, findIndexOfCurrentId);
    if (findIndexOfCurrentId === -1) copyMultiple.push(getCurrentId);
    else copyMultiple.splice(findIndexOfCurrentId, 1);

    setMultiple(copyMultiple);

    console.log("mul", selected, multiple);
  }
  return (
    <div className=" py-6">
      <div className="flex flex-col   w-full justify-center items-center">
        <div className="font-bold py-8 text-5xl">Accordian</div>
        <div className="flex space-x-4">
          <button
            className={`border  rounded-md ${
              enableMultiSelection ? "bg-green-400" : "bg-gray-200"
            }`}
            onClick={() => setEnableMultiSelection(!enableMultiSelection)}
          >
            Enable multi selection
          </button>
          <button
            className={`border  rounded-md ${
              enableMultiSelection ? "bg-gray-200" : "bg-green-400"
            }`}
            onClick={() => setEnableMultiSelection(!enableMultiSelection)}
          >
            Enable single selection
          </button>
        </div>

        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <>
              <div className="flex flex-row justify-between font-bold text-xl space-x-6 bg-orange-300 py-6 my-4 px-6 w-1/3">
                <div className=" ">{dataItem.question}</div>
                <div className="">
                  <span
                    className="cursor-pointer"
                    onClick={
                      enableMultiSelection
                        ? () => handleMultiSelection(dataItem.id)
                        : () => handleSingleSelection(dataItem.id)
                    }
                  >
                    +
                  </span>
                </div>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="w-1/3 py-2 bg-violet-300 text-center text-lg">
                      {dataItem.answer}
                    </div>
                  )
                : selected === dataItem.id && (
                    <div className="w-1/3 py-2 bg-violet-300 text-center text-lg">
                      {dataItem.answer}
                    </div>
                  )}

              {/* {selected === dataItem.id ? (
                <div className="w-1/3 py-2 bg-violet-300 text-center text-lg">
                  {dataItem.answer}
                </div>
              ) : (
                ""
              )} */}
            </>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
