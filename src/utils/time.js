/**
 * [getTimeString description]
 * @param  {Date.getTime()} AdDate  [description]
 * @param  {int} AiStart [description]
 * @param  {int} AiEnd   [description]
 * @param  {object} cfg     connectorDate,connectorTime,
 * @return {String}         [description]
 */
import config from '../config.js'
function getTimeString(AdDate, AiStart = 0, AiEnd, cfg = {}) {
  if (AiEnd == undefined) {
    if (cfg.connectorDate === 'char') {
      AiEnd = 20
    } else {
      AiEnd = 19
    }
  }
  function pad0(num) {
    return num >= 10 ? num : "0" + num;
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
function dayQtyOfMonth(stamp=config.nowDate){
  var time=new Date(stamp)
  var month=time.getMonth(),year=time.getFullYear(),date=time.getDate()
  var nextMonth=new Date(year,month+1,1)
  var thisMonth=new Date(year,month,1)
  var miliSecond=nextMonth.getTime()-thisMonth.getTime()
  var qty=miliSecond/24/3600000
  return qty
}
function getStampByDate(date,monthAdd=0){
  let now=config.nowDate
  let newDate=new Date(now.getFullYear(),now.getMonth()+monthAdd,Number(date))
  return newDate.getTime()
}
var TimeUtil = {}
TimeUtil.getTimeString = getTimeString
TimeUtil.dayQtyOfMonth = dayQtyOfMonth
TimeUtil.getStampByDate = getStampByDate
export {
  getTimeString,dayQtyOfMonth,getStampByDate
}
export default TimeUtil