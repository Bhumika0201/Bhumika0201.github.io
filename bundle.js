(function (d3) {
  'use strict';

  const svg = d3.select('svg');

  const width = +svg.attr('width');
  const height = +svg.attr('height');

  const render = data => {
    const title = 'Henry Hub Natural Gas Spot price';
    
    const xValue = d => d.Date;
    const xAxisLabel = 'Year';
    
    const yValue = d => d.Price;
    const yAxisLabel = 'Price in Dollars per million';
    
     const margin = { top: 60, right: 40, bottom: 88, left: 105 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, xValue))
      .range([0, innerWidth])
      .nice();
    
    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0])
      .nice();
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xAxis = d3.axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);
    
    const yAxis = d3.axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);
    
    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();
    
    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);
    
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);
    
    xAxisG.select('.domain').remove();
    
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 80)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);
    
    const lineGenerator = d3.line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(d3.curveBasis);
    
    g.append('path')
        .attr('class', 'line-path')
        .attr('d', lineGenerator(data));
    
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(title);
  };

  d3.csv('./Pricerecord_datewise.csv')
    .then(data => {
     
      data.forEach(d => {
        d.Price = +d.Price;
          d.Date= new Date(d.Date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
         
        //console.log(new Date( d.Date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")))
      });
      render(data);
    });

}(d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHNlbGVjdCxcbiAgY3N2LFxuICBzY2FsZUxpbmVhcixcbiAgc2NhbGVUaW1lLFxuICBleHRlbnQsXG4gIGF4aXNMZWZ0LFxuICBheGlzQm90dG9tLFxuICBsaW5lLFxuICBjdXJ2ZUJhc2lzXG59IGZyb20gJ2QzJztcblxuY29uc3Qgc3ZnID0gc2VsZWN0KCdzdmcnKTtcblxuY29uc3Qgd2lkdGggPSArc3ZnLmF0dHIoJ3dpZHRoJyk7XG5jb25zdCBoZWlnaHQgPSArc3ZnLmF0dHIoJ2hlaWdodCcpO1xuXG5jb25zdCByZW5kZXIgPSBkYXRhID0+IHtcbiAgY29uc3QgdGl0bGUgPSAnQSBXZWVrIGluIFNhbiBGcmFuY2lzY28nO1xuICBcbiAgY29uc3QgeFZhbHVlID0gZCA9PiBkLnRpbWVzdGFtcDtcbiAgY29uc3QgeEF4aXNMYWJlbCA9ICdUaW1lJztcbiAgXG4gIGNvbnN0IHlWYWx1ZSA9IGQgPT4gZC50ZW1wZXJhdHVyZTtcbiAgY29uc3QgY2lyY2xlUmFkaXVzID0gNjtcbiAgY29uc3QgeUF4aXNMYWJlbCA9ICdUZW1wZXJhdHVyZSc7XG4gIFxuICBjb25zdCBtYXJnaW4gPSB7IHRvcDogNjAsIHJpZ2h0OiA0MCwgYm90dG9tOiA4OCwgbGVmdDogMTA1IH07XG4gIGNvbnN0IGlubmVyV2lkdGggPSB3aWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0O1xuICBjb25zdCBpbm5lckhlaWdodCA9IGhlaWdodCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuICBcbiAgY29uc3QgeFNjYWxlID0gc2NhbGVUaW1lKClcbiAgICAuZG9tYWluKGV4dGVudChkYXRhLCB4VmFsdWUpKVxuICAgIC5yYW5nZShbMCwgaW5uZXJXaWR0aF0pXG4gICAgLm5pY2UoKTtcbiAgXG4gIGNvbnN0IHlTY2FsZSA9IHNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKGV4dGVudChkYXRhLCB5VmFsdWUpKVxuICAgIC5yYW5nZShbaW5uZXJIZWlnaHQsIDBdKVxuICAgIC5uaWNlKCk7XG4gIFxuICBjb25zdCBnID0gc3ZnLmFwcGVuZCgnZycpXG4gICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHttYXJnaW4ubGVmdH0sJHttYXJnaW4udG9wfSlgKTtcbiAgXG4gIGNvbnN0IHhBeGlzID0gYXhpc0JvdHRvbSh4U2NhbGUpXG4gICAgLnRpY2tTaXplKC1pbm5lckhlaWdodClcbiAgICAudGlja1BhZGRpbmcoMTUpO1xuICBcbiAgY29uc3QgeUF4aXMgPSBheGlzTGVmdCh5U2NhbGUpXG4gICAgLnRpY2tTaXplKC1pbm5lcldpZHRoKVxuICAgIC50aWNrUGFkZGluZygxMCk7XG4gIFxuICBjb25zdCB5QXhpc0cgPSBnLmFwcGVuZCgnZycpLmNhbGwoeUF4aXMpO1xuICB5QXhpc0cuc2VsZWN0QWxsKCcuZG9tYWluJykucmVtb3ZlKCk7XG4gIFxuICB5QXhpc0cuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzLWxhYmVsJylcbiAgICAgIC5hdHRyKCd5JywgLTYwKVxuICAgICAgLmF0dHIoJ3gnLCAtaW5uZXJIZWlnaHQgLyAyKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnYmxhY2snKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGByb3RhdGUoLTkwKWApXG4gICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgIC50ZXh0KHlBeGlzTGFiZWwpO1xuICBcbiAgY29uc3QgeEF4aXNHID0gZy5hcHBlbmQoJ2cnKS5jYWxsKHhBeGlzKVxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKDAsJHtpbm5lckhlaWdodH0pYCk7XG4gIFxuICB4QXhpc0cuc2VsZWN0KCcuZG9tYWluJykucmVtb3ZlKCk7XG4gIFxuICB4QXhpc0cuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzLWxhYmVsJylcbiAgICAgIC5hdHRyKCd5JywgODApXG4gICAgICAuYXR0cigneCcsIGlubmVyV2lkdGggLyAyKVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnYmxhY2snKVxuICAgICAgLnRleHQoeEF4aXNMYWJlbCk7XG4gIFxuICBjb25zdCBsaW5lR2VuZXJhdG9yID0gbGluZSgpXG4gICAgLngoZCA9PiB4U2NhbGUoeFZhbHVlKGQpKSlcbiAgICAueShkID0+IHlTY2FsZSh5VmFsdWUoZCkpKVxuICAgIC5jdXJ2ZShjdXJ2ZUJhc2lzKTtcbiAgXG4gIGcuYXBwZW5kKCdwYXRoJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdsaW5lLXBhdGgnKVxuICAgICAgLmF0dHIoJ2QnLCBsaW5lR2VuZXJhdG9yKGRhdGEpKTtcbiAgXG4gIGcuYXBwZW5kKCd0ZXh0JylcbiAgICAgIC5hdHRyKCdjbGFzcycsICd0aXRsZScpXG4gICAgICAuYXR0cigneScsIC0xMClcbiAgICAgIC50ZXh0KHRpdGxlKTtcbn07XG5cbmNzdignaHR0cHM6Ly92aXpodWIuY29tL2N1cnJhbi9kYXRhc2V0cy90ZW1wZXJhdHVyZS1pbi1zYW4tZnJhbmNpc2NvLmNzdicpXG4gIC50aGVuKGRhdGEgPT4ge1xuICAgIGRhdGEuZm9yRWFjaChkID0+IHtcbiAgICAgIGQudGVtcGVyYXR1cmUgPSArZC50ZW1wZXJhdHVyZTtcbiAgICAgIGQudGltZXN0YW1wID0gbmV3IERhdGUoZC50aW1lc3RhbXApO1xuICAgIH0pO1xuICAgIHJlbmRlcihkYXRhKTtcbiAgfSk7Il0sIm5hbWVzIjpbInNlbGVjdCIsInNjYWxlVGltZSIsImV4dGVudCIsInNjYWxlTGluZWFyIiwiYXhpc0JvdHRvbSIsImF4aXNMZWZ0IiwibGluZSIsImN1cnZlQmFzaXMiLCJjc3YiXSwibWFwcGluZ3MiOiI7OztFQVlBLE1BQU0sR0FBRyxHQUFHQSxTQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O0VBRTFCLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFD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