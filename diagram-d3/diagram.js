var svg = d3.select('body')
                    .append('svg')
                    .attrs({ width: 500, height: 200 });
svg.append('rect').attrs({ x: 10, y: 10, width: 80, height: 80, fill: 'red' })