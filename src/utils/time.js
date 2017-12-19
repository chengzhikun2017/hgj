/**
 * [getTimeString description]
 * @param  {Date.getTime()} AdDate  [description]
 * @param  {int} AiStart [description]
 * @param  {int} AiEnd   [description]
 * @param  {object} cfg     connectorDate,connectorTime,
 * @return {String}         [description]
 */
function getTimeString(AdDate, AiStart = 0, AiEnd, cfg = {}) {
  if (AiEnd == undefined) {
    if (cfg.connectorDate === 'char') {
      AiEnd = 20
    } else {
      AiEnd = 19
    }
  }
  function pad0(aNum) {
    return aNum >= 10 ? aNum : "0" + aNum;
  };
  if (AdDate === undefined) {
    var dNow = new Date();
  } else {
    var dNow = new Date(AdDate);
  }
  if (cfg.connectorDate === undefined) {
    cfg.connectorDate = '/'
  }
  if (cfg.connectorTime === undefined) {
    cfg.connectorTime = ':'
  }
  let iH = pad0(dNow.getHours());
  let iM = pad0(dNow.getMinutes());
  let iS = pad0(dNow.getSeconds());
  let iD = pad0(dNow.getDate());
  let iMonth = pad0(dNow.getMonth() + 1);
  let iY = dNow.getFullYear();
  let sNow,sNowDay,sNowTime;
  if (cfg.connectorDate === 'char') {
    sNowDay=iY + '年' + iMonth + '月' + iD + "日"
    sNowTime=iH + cfg.connectorTime + iM + cfg.connectorTime + iS
    sNow = sNowDay +' '+sNowTime
  } else {
    sNowDay=iY + cfg.connectorDate + iMonth + cfg.connectorDate + iD 
    sNowTime=iH + cfg.connectorTime + iM + cfg.connectorTime + iS;
    sNow = sNowDay +' '+sNowTime
  }
  return sNow.slice(AiStart, AiEnd);
};
var TimeUtil = {}
TimeUtil.getTimeString = getTimeString
export {
  getTimeString
}
export default TimeUtil