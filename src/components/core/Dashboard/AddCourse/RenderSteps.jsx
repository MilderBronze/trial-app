import React from "react";
import { useSelector } from "react-redux";

function RenderSteps() {
  // a stepper form
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <div>
      {steps.map((item) => (
        // to highlight a certain step jispe tum ho.. you match the step with the steps ke andar present id
        // agar match kr jaaye toh highlight kra do other wise jaane do.
        <>
          <div
            className={`${
              step === item.id
                ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                : " border-richblack-700 bg-richblack-800 text-richblack-300"
            }`}
          ></div>
        </>
      ))}
    </div>
  );
}

export default RenderSteps;
