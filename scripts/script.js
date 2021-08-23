const Patches = require('Patches')
const {log, watch} = require('Diagnostics')
const R = require('Reactive')

;(async function () { 

  const motionVector = await Patches.outputs.getPoint2D('oMotionVector')
  const position = await Patches.outputs.getPoint2D('oPosition')

  position.x.monitor({fireOnInitialValue: true}).subscribeWithSnapshot({
    mx: motionVector.x,
    my: motionVector.y,
    px: position.x,
    py: position.y,
  }, (val, {mx, my, px, py}) => {
    const mv = R.pack2(mx, my)
    const p = R.pack2(px, py)
    Patches.inputs.setPoint2D('motionVector', mv)
    Patches.inputs.setPoint2D('position', p)
  })

  // Patches.inputs.setPoint2D('motionVector', R.pack2(Math.random(), Math.random()).normalize().mul(3))
  Patches.inputs.setPoint2D('motionVector', R.pack2(2.4, 1.8))
  Patches.inputs.setPoint2D('position', R.pack2(1, 1))

})()
