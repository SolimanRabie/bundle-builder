import { memo, useMemo } from "react";
import type { Step } from "../../types/product";
import { useBundleState, useBundleActions } from "../../context/BundleContext";
import ProductCard from "../ProductCard/ProductCard";
import Button from "../Button/Button";
import { STEP_ICONS, ChevronIcon } from "../icons";
import { getStepSelectedCount } from "../../utils/getSelectedItems";

interface AccordionStepProps {
  step: Step;
  isOpen: boolean;
  isLast: boolean;
  nextStepTitle?: string;
  nextStepId?: string;
}

function AccordionStep({
  step,
  isOpen,
  isLast,
  nextStepTitle,
  nextStepId,
}: AccordionStepProps) {
  const { state } = useBundleState();
  const { toggleStep, nextStep } = useBundleActions();
  const Icon = STEP_ICONS[step.icon];

  const selectedCount = useMemo(
    () => getStepSelectedCount(step, state.quantities),
    [step, state.quantities]
  );

  return (
    <section className={"accordion-step" + (isOpen ? " accordion-step--open" : "")}>
      <button
        type="button"
        className="accordion-step__header"
        onClick={() => toggleStep(step.id)}
        aria-expanded={isOpen}
      >
        <div className="accordion-step__heading">
          <span className="accordion-step__eyebrow">STEP {step.stepNumber} OF 4</span>
          <div className="accordion-step__title-row">
            {Icon && <Icon className="accordion-step__icon" />}
            <h2 className="accordion-step__title">{step.title}</h2>
          </div>
        </div>

        <div className="accordion-step__state">
          {isOpen ? (
            <span className="accordion-step__count">{selectedCount} selected</span>
          ) : (
            selectedCount > 0 && (
              <span className="accordion-step__count accordion-step__count--muted">
                {selectedCount} selected
              </span>
            )
          )}
          <ChevronIcon direction={isOpen ? "up" : "down"} />
        </div>
      </button>

      {isOpen && (
        <div className="accordion-step__body">
          <div className="product-grid">
            {step.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                productState={state.quantities[product.id]}
              />
            ))}
          </div>

          {!isLast && nextStepTitle && nextStepId && (
            <Button variant="outline" className="btn--next" onClick={() => nextStep(nextStepId)}>
              Next: {nextStepTitle}
            </Button>
          )}
        </div>
      )}
    </section>
  );
}

export default memo(AccordionStep);
