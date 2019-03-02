export default {
  getRandomData: function rand (nOrg, limitIds, perkData, lastPos) {
    let avPerks = []
    let avPerkData = []
    let n = nOrg
    if (limitIds) {
      avPerks = limitIds.split(',').map(function (item) {
        return parseInt(item, 10)
      })
    }
    let avLen = avPerks.length
    if (avLen >= 4) {
      for (let i = 0, pLen = perkData.length; i < pLen; i++) {
        if (perkData[i].index === i && avPerks.indexOf(i) >= 0) avPerkData.push(perkData[i])
        if (avPerkData.length === avLen) break
      }
    }

    avPerkData = avPerkData.length >= 4 ? avPerkData : perkData

    const result = new Array(n)
    let len = avPerkData.length
    const taken = new Array(len)
    // https://stackoverflow.com/a/19270021
    if (n > len) {
      throw new RangeError('getRandom: more elements taken than available')
    }
    while (n--) {
      let x = Math.floor(Math.random() * len)
      result[n] = avPerkData[x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
    }
    for (let i = 0, l = lastPos.length; i < l; i++) {
      // make sure it's not the same perk again
      if (lastPos[i].index === result[i].index) return rand(nOrg, limitIds, perkData, lastPos)
    }

    return result // TODO make sure there is some distance to the last roll
  }
}
