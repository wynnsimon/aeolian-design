
export const drawingBoardProps = {
  showTools: {
    type: Boolean,
    default: true,
  },
};

export const drawingBoardEmits = {
  complete: (ctx: HTMLCanvasElement | null) => void(ctx),
};
