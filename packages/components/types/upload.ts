import type { ExtractPropTypes, PropType } from "vue";

export interface UploadFile {
  uid?: number;
  name: string;
  url?: string;
  // 上传进度
  percentage: number;
  // 原始文件
  raw?: File;
  // 文件大小
  size?: number;
  // 文件状态
  status: string;
}

export type UploadFiles = UploadFile[];

export const baseProps = {
  FileList: {
    type: Array as PropType<UploadFiles>,
    default: () => [] as const,
  },
  action: {
    type: String,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  // input中的类型
  name: {
    type: String,
    default: "file",
  },
  accept: {
    type: String,
    default: "",
  },
  method: {
    type: String,
    default: "post",
  },
  headers: {
    type: Object,
    default: () => {},
  },
  data: {
    type: Object,
    default: () => {},
  },
};

export type UploadRawFile = File & {
  uid: number;
};

export type UploadProgressEvent = ProgressEvent & { percentage: number };
const NOOP = () => {};
export const uploadProps = {
  ...baseProps,
  onPreview: {
    //预览时调用这个回调拿到上此的图片
    type: Function as PropType<(file: UploadFile) => void>,
    default: NOOP,
  },
  beforeUpload: {
    //上传之前调用这个回调
    type: Function as PropType<
      (file: UploadRawFile) => Promise<boolean> | boolean
    >,
    default: NOOP,
  },
  onChange: {
    type: Function as PropType<(file: UploadFile) => void>,
    default: NOOP,
  },
  beforeRemove: {
    type: Function as PropType<
      (file: UploadFile, uploadFiles: UploadFiles) => Promise<boolean> | boolean
    >,
    default: NOOP,
  },
  onRemove: {
    type: Function as PropType<
      (file: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: NOOP,
  },
  onProgress: {
    type: Function as PropType<
      (
        e: UploadProgressEvent,
        uploadFile: UploadFile,
        uploadFiles: UploadFiles
      ) => void
    >,
    default: NOOP,
  },
  onSuccess: {
    type: Function as PropType<
      (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: NOOP,
  },
  onError: {
    type: Function as PropType<
      (err: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: NOOP,
  },
} as const;

export type UploadProps = ExtractPropTypes<typeof uploadProps>;

export function genId(): number {
  return Date.now();
}

export const uploadContentProps = {
  ...baseProps,
  beforeUpload: uploadProps["beforeUpload"],
  onStart: {
    type: Function as PropType<(rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
  onProgress: {
    type: Function as PropType<
      (e: UploadProgressEvent, rawFile: UploadRawFile) => void
    >,
    default: NOOP,
  },
  onRemove: {
    type: Function as PropType<(rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
  onSuccess: {
    type: Function as PropType<(res: any, rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
  onError: {
    type: Function as PropType<(err: Error, rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
} as const;

export type UploadContentProps = ExtractPropTypes<typeof uploadContentProps>;

export interface RequestOptions {
  method: string;
  file: File;
  name: string;
  action: string;
  headers: Headers | Record<string, any>;
  data: Record<string, any>;
  onError: (e: any) => void;
  onSuccess: (res: any) => void;
  onProgress: (e: UploadProgressEvent) => void;
}
