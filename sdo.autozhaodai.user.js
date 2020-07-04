// ==UserScript==
// @name        自动领取招待奖励
// @namespace   com.oott123.sdo.autozhaodai
// @match       https://actff1.web.sdo.com/20190315Zhaodai/index.html
// @grant       none
// @version     1.1
// @author      -
// @description 2/14/2020, 12:22:28 PM
// ==/UserScript==

async function post(method, args) {
  const resp = await fetch('Server/User.ashx', {
    method: 'post',
    body: `method=${method}&${args}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
  const json = await resp.json()
  return json
}

function getAttach(body) {
  if (body.Code !== 0) {
    alert(body.Message);
    throw body.Message;
  }
  return JSON.parse(body.Attach)
}

async function getList() {
  const list = getAttach(await post('querybinduser'))
  return list
}

async function refresh(pt) {
  const data = getAttach(await post('updgrade', `pt=${encodeURIComponent(pt)}`))
  return data
}

async function getReward(id) {
  const resp = await post('getaward1', `bindid=${encodeURIComponent(id)}`)
  return resp
}

function handleGetAllClick({ log }) {
  return async () => {
    const list = await getList()
    log(`获取到 ${list.length} 个被招待者...`)
    const queue = list.map(x => ({
      method: parseInt(x.Grade) >= 70 ? 'getReward' : 'refresh',
      pt: x.PtAccount,
      id: x.Id
    }))
    runQueue(queue, log)
  }
}

async function runQueue(q, log) {
  const queue = q.splice(0)
  let resolve, reject
  const promise = new Promise((r1, r2) => {
    resolve = r1
    reject = r2
  })
  
  const runTaskM = async (obj) => {
    if (obj.method === 'getReward') {
      const resp = await getReward(obj.id)
      if (resp.Message === '成功') {
        log.successCount++;
      }
      log(`领取 ${obj.pt} 的奖励: ${resp.Message}`)
    } else if (obj.method === 'refresh') {
      const data = await refresh(obj.pt)
      if (data >= 70) {
        queue.unshift({
          method: 'getReward',
          pt: obj.pt,
          id: obj.id
        })
        log(`${obj.pt} 等级 ${data}，已加入奖励队列`)
      } else {
        log(`${obj.pt} 等级 ${data}`)
      }
    }
  }
  
  let timer
  const timeout = 3100
  
  const runTask = async () => {
    clearTimeout(timer)
    if (queue.length <= 0) {
      log(`任务全部执行完成，成功领取招待奖励 ${log.successCount} 份`)
      return
    } else {
      log(`剩余 ${queue.length} 个任务，预计时间 ${(queue.length * 3 / 60).toFixed(1)} 分钟`)
    }
    try {
      await runTaskM(queue.shift())
      timer = setTimeout(runTask, timeout)
    } catch (e) {
      console.log(e)
      log(`发生错误：${e}`)
    }
  }
  
  timer = setTimeout(runTask, timeout)

  return promise
}

function drawUI(container) {
  container.style.position = 'fixed'
  container.style.left = '20px'
  container.style.top = '20px'
  container.style.width = '300px'
  container.style.background = 'rgba(0, 0, 0, 0.6)'
  container.style.lineHeight = '1.2'
  container.style.padding = '4px'
  container.style.maxHeight = '50vh'
  container.style.overflow = 'auto'
  
  const btnP = document.createElement('p')
  const getAllBtn = document.createElement('button')
  getAllBtn.innerText = '领取所有奖励'
  btnP.appendChild(getAllBtn)
  container.appendChild(btnP)
  
  const logContainer = document.createElement('p')
  logContainer.style.whiteSpace = 'pre-wrap'
  logContainer.style.marginTop = '8px'
  logContainer.style.fontSize = '9pt'
  logContainer.style.color = '#fff'
  logContainer.style.fontFamily = 'monospace'

  container.appendChild(logContainer)

  const log = createAddLog(logContainer)
  log.successCount = 0
  
  getAllBtn.addEventListener('click', handleGetAllClick({ log }))
  
  document.body.appendChild(container)
  
  return { logContainer }
}

function createAddLog(logContainer) {
  return function (logText) {
    const logLine = document.createElement('div')
    logLine.innerText = logText
    logContainer.prepend(logLine)
  }
}

async function init() {
  const container = document.createElement('div')
  const { logContainer } = drawUI(container)
}

init()
.catch(e => {
  console.error(e)
})
