let rand = {
  getRandomData: function (n, query, perkData) {
    let avPerks = []
    let avPerkData = []
    if (query.kids) {
      avPerks = query.kids.split(',').map(function (item) {
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

    let result = new Array(n)
    let len = avPerkData.length
    let taken = new Array(len)
    // https://stackoverflow.com/a/19270021
    if (n > len) {
      throw new RangeError('getRandom: more elements taken than available')
    }
    while (n--) {
      let x = Math.floor(Math.random() * len)
      result[n] = avPerkData[x in taken ? taken[x] : x]
      taken[x] = --len in taken ? taken[len] : len
    }
    return result
  }
}

export default rand
