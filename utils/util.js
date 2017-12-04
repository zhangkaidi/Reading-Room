const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const getLocalTime = nS => {
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

const getUnixTime = () =>{
  return Math.round(new Date().getTime() / 1000)
}
module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  getLocalTime: getLocalTime, //格式化时间
  getUnixTime: getUnixTime //时间戳
}
