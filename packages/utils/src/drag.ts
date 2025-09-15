import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  unref,
  type Ref,
} from "vue";

type DragOptions = {
  draggingElement?: any;
  initValue?: { x: number; y: number };
  limit?: Ref<HTMLElement>;
};

export function useDrag(target: Ref<HTMLElement>, options: DragOptions) {
  const { draggingElement = window, initValue, limit } = options;

  // 移动的位置
  const position = ref(
    initValue ?? {
      x: 0,
      y: 0,
    }
  );

  // 鼠标按下的点
  const pressedPos = ref<{ x: number; y: number } | null>(null);

  // 获取元素尺寸
  const size = computed(() => {
    return {
      width: target.value.offsetWidth || 0,
      height: target.value.offsetHeight || 0,
    };
  });

  const areaLimit = ref({
    left: 0,
    top: 0,
    right: 500,
    bottom: 500,
  });
  let mo: MutationObserver;
  let re: ResizeObserver;

  // 更新下；对位置
  function initWatch() {
    const limitDiv = unref(limit) || document.body;
    function callback() {
      const { left, top, right, bottom } = limitDiv.getBoundingClientRect();
      areaLimit.value = {
        left,
        top,
        right,
        bottom,
      };
      position.value = limitArea();
    }

    if (limitDiv) {
      mo = new MutationObserver(callback);
      mo.observe(limitDiv, {
        attributes: true,
      });
      re = new ResizeObserver(callback);
      re.observe(limitDiv);
      callback();
    }
  }

  function limitArea({ x, y }: { x: number; y: number } = position.value) {
    if (x < areaLimit.value.left) {
      x = areaLimit.value.left;
    }
    if (x > areaLimit.value.right - size.value.width) {
      x = areaLimit.value.right - size.value.width;
    }
    if (y < areaLimit.value.top) {
      y = areaLimit.value.top;
    }
    if (y > areaLimit.value.bottom - size.value.height) {
      y = areaLimit.value.bottom - size.value.height;
    }
    return { x, y };
  }

  function startDrag(e: PointerEvent) {
    console.log("startDrag",e);
    const rect = target.value.getBoundingClientRect();
    pressedPos.value = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    e.preventDefault();
  }

  function moveDrag(e: PointerEvent) {
    const offset = unref(pressedPos);
    if (!offset) return;

    position.value = limitArea({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  }

  function stopDrag(e: PointerEvent) {
    pressedPos.value = null;
  }

  onMounted(() => {
    const el = unref(target);
    if (!el) {
      console.warn("拖拽目标不存在");
    }
    el.addEventListener("pointerdown", startDrag);
    draggingElement.addEventListener("pointermove", moveDrag);
    draggingElement.addEventListener("pointerup", stopDrag);

    initWatch();
  });

  onBeforeUnmount(() => {
    const el = unref(target);
    if (el) {
      el.removeEventListener("pointerdown", startDrag);
      draggingElement.removeEventListener("pointermove", moveDrag);
      draggingElement.removeEventListener("pointerup", stopDrag);
    }

    mo?.disconnect();
    re?.disconnect();
  });

  return {
    isDragging: !!pressedPos.value,
    position,
    style: computed(() => ({
      left: `${position.value.x}px`,
      top: `${position.value.y}px`,
    })),
  };
}
