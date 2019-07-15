// target 需为id
function GetViewSize(target: any = '') {
  if (target) {
    const dom = document.getElementById(target) as HTMLElement
    return {
      top: dom.scrollTop,
      height: dom.clientHeight,
      width: dom.clientWidth
    }
  }
  const dom = document.documentElement
  return {
    top: 0,
    width: Math.max(dom.clientWidth, window.innerWidth || 0),
    height: Math.max(dom.clientHeight || 0)
  }
}

export default GetViewSize;
