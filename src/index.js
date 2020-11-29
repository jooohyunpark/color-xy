import './style.scss'
import * as d3 from 'd3'

const width = 640
const height = 640

const data = []
const count = 1000

const colors = ['#9A303A', '#dd5f3d', '#edc592', '#bcdabf', '5f9e77']

for (let i = 0; i < count; i++) {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  data.push({ color: '#' + randomColor })
}

const canvas = document.querySelector('.canvas')
canvas.style.width = width + 'px'
canvas.style.height = height + 'px'

const svg = d3
  .select('.canvas')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

const xScale = d3
  .scaleLinear()
  .range([0, width])
  .domain(
    d3.extent(data, function(d, i) {
      return i
    })
  )

for (let col = 0; col < 10; col++) {
  const g = svg.append('g').attr('class', 'focus')

  g.selectAll('line')
    .data(data)
    .enter()
    .append('line')
    .attr('x1', function(d, i) {
      return xScale(i)
    })
    .attr('y1', (height / 10) * col)
    .attr('x2', function(d, i) {
      return xScale(i)
    })
    .attr('y2', (height / 10) * (col + 1))
    .style('stroke', function(d) {
      return pick(colors)
    })
    .style('stroke-width', 1)
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)]
}

// function download() {
//   const dataURL = svgDataURL(svg)
//   const dl = document.createElement('a')
//   dl.setAttribute('href', dataURL)
//   dl.setAttribute('download', 'planet-earth.svg')
//   dl.click()
//   console.log('download')
// }

// function svgDataURL(svg) {
//   var svgAsXML = new XMLSerializer().serializeToString(svg)
//   return 'data:image/svg+xml,' + encodeURIComponent(svgAsXML)
// }

// document.addEventListener('keydown', e => {
//   if (e.which === 32) download()
// })
