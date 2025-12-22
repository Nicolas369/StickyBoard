import { forwardRef } from "react";
import type { ForwardedRef } from "react";

const TrashZone = forwardRef<HTMLDivElement, {}>(
  (_props, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref} className="trash-zone">
      <span className="trash-zone-icon">🗑️</span>
      <samp className="trash-zone-label">Trash</samp>
    </div>
  )
);

TrashZone.displayName = "TrashZone";

export default TrashZone;
