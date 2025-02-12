let canvas
let gl
let canvasUI
let context

let vShader, fShader, progarm, vaUI, vbUI, gt
let laPosition, laColor, laTexcoord, luColor, luTranslate, luScale, luRotate, luCameraT, luCameraS, luCameraR, luCameraP, luMode

let gameLoop
let frameCurrent
let framePrevious
let delta

let scene = 'Title'
let state = 'Start'
let menu = false
