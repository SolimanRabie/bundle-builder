import { useBundleState } from "../../context/BundleContext";
import AccordionStep from "./AccordionStep";

export default function Accordion() {
  const { state, steps } = useBundleState();

  return (
    <div className="builder">
      <div className="builder__steps">
        {steps.map((step, index) => {
          const next = steps[index + 1];
          return (
            <AccordionStep
              key={step.id}
              step={step}
              isOpen={state.openStepId === step.id}
              isLast={index === steps.length - 1}
              nextStepTitle={next?.title}
              nextStepId={next?.id}
            />
          );
        })}
      </div>
    </div>
  );
}
