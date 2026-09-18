/**
 * Not a component — a pair of clip-path polygons shared by PropertyShowcase
 * for the House -> Outside beat, so the architecture itself performs the
 * transition: a peaked roofline silhouette grows from the base of the frame
 * until it overruns the edges and the next photograph is fully revealed.
 *
 * Both polygons use the same five-point topology (apex, two eaves, two
 * base corners) so the browser interpolates the shape smoothly rather than
 * jump-cutting between mismatched point counts.
 */
export const A_FRAME_CLOSED =
  "polygon(50% 96%, 51% 98%, 51% 100%, 49% 100%, 49% 98%)";

export const A_FRAME_OPEN =
  "polygon(50% -20%, 120% 45%, 120% 120%, -20% 120%, -20% 45%)";
