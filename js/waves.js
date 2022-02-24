{
    ;('use strict')
  
    var canvasElement, scene
    var nodes = 2
    var waves = []
    var waveHeight = 768
    var colours = [
      'rgba(15,39,65,1)',
      'rgba(15,39,65,0.66)',
      'rgba(15,39,65,0.33)',
    ]
  
    // init
    function init() {
      canvasElement = document.getElementById('canvas')
      scene = canvasElement.getContext('2d')
      resizeCanvas(canvasElement)
  
      for (var i = 0; i < 3; i++) {
        waves.push(new wave(colours[i], 1, nodes))
      }
  
      update()
    }
  
    function update() {
      var fill = window
        .getComputedStyle(document.getElementById('main'), null)
        .getPropertyValue('background-color')
      scene.fillStyle = fill
      scene.globalCompositeOperation = 'source-over'
      scene.fillRect(0, 0, canvasElement.width, canvasElement.height)
      // color fill type
      scene.globalCompositeOperation = 'source-atop'
      for (var i = 0; i < waves.length; i++) {
        for (var j = 0; j < waves[i].nodes.length; j++) {
          bounce(waves[i].nodes[j])
        }
        drawWave(waves[i])
      }
      scene.fillStyle = fill
  
      requestAnimationFrame(update)
    }
  
    function wave(colour, lambda, nodes) {
      this.colour = colour
      this.lambda = lambda
      this.nodes = []
      var tick = 1
  
      for (var i = 0; i <= nodes + 2; i++) {
        var temp = [
          ((i - 1) * canvasElement.width) / nodes,
          0,
          Math.random() * 200,
          0.1,
        ]
        this.nodes.push(temp)
      }
    }
  
    function bounce(nodeArr) {
      nodeArr[1] =
        (waveHeight / 10) * Math.sin(nodeArr[2] / 20) + canvasElement.height / 2
      nodeArr[2] = nodeArr[2] + nodeArr[3]
    }
  
    function drawWave(obj) {
      var diff = function (a, b) {
        return (b - a) / 2 + a
      }
  
      scene.fillStyle = obj.colour
      scene.beginPath()
      scene.moveTo(0, canvasElement.height)
      scene.lineTo(obj.nodes[0][0], obj.nodes[0][1])
  
      for (var i = 0; i < obj.nodes.length; i++) {
        if (obj.nodes[i + 1]) {
          scene.quadraticCurveTo(
            obj.nodes[i][0],
            obj.nodes[i][1],
            diff(obj.nodes[i][0], obj.nodes[i + 1][0]),
            diff(obj.nodes[i][1], obj.nodes[i + 1][1])
          )
        } else {
          scene.lineTo(obj.nodes[i][0], obj.nodes[i][1])
          scene.lineTo(canvasElement.width, canvasElement.height)
        }
      }
      scene.closePath()
      scene.fill()
    }
  
    function drawNodes(array) {
      scene.strokeStyle = '#0f2741'
  
      for (var i = 0; i < array.length; i++) {
        scene.beginPath()
        scene.arc(array[i][0], array[i][1], 4, 0, 2 * Math.PI)
        scene.closePath()
        scene.stroke()
      }
    }
  
    function drawLine(array) {
      scene.strokeStyle = '#0f2741'
  
      for (var i = 0; i < array.length; i++) {
        if (array[i + 1]) {
          scene.lineTo(array[i + 1][0], array[i + 1][1])
        }
      }
  
      scene.stroke()
    }
  
    function resizeCanvas(canvas, width, height) {
      if (width && height) {
        canvas.width = width
        canvas.height = height
      } else {
        if (window.innerWidth < 1024) {
          canvas.width = window.innerWidth * 4
        } else {
          canvas.width = window.innerWidth * 4
        }
  
        canvas.height = window.innerHeight * 1
      }
    }
  
    document.addEventListener('DOMContentLoaded', init, false)
  }
  