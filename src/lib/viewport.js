export default {
  getWidth: function () {
    return window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
  },
  getElementLength: function () {
    const vw = this.getWidth()
    const elLen = vw / 4
    if (elLen > 256) return 256
    if (elLen < 128) {
      if (vw >= 256) {
        return vw / 2
      }
      return 128
    }
    return elLen
  }
}
