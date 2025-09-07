self.onmessage = (e: MessageEvent) => {
  const { file } = e.data;
  postMessage(file);
};
