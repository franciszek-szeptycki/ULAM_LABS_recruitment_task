import { createRef, useEffect } from "react";
import * as d3 from "d3";
import "./Chart.sass";
import { NumberValue } from "d3";

const Chart = () => {
    const d3Chart: any = createRef();

	// const CountsByDate: any = [
	// 	{ date: 27, count: 30 },
	// 	{ date: 22, count: 31 },
	// 	{ date: 21, count: 50 },
	// 	{ date: 18, count: 13 },
	// 	{ date: 15, count: 23 },
	// ];
    useEffect(() => {
    //     d3.select(d3Chart);

		


    //     const margin = { top: 50, right: 30, bottom: 30, left: 30 };
    //     const width = parseInt(d3.select(".d3chart").style("width"));
    //     const height = parseInt(d3.select(".d3chart").style("height"));

    //     const svg = d3
    //         .select(d3Chart.current)
    //         .attr("width", width)
	// 		.attr("height", height)
	// 		.style('background-color', 'yellow')
	// 		.append('g')
	// 		.attr('tranform', 'translate(' + margin.left + ',' + margin.top + ')')
		
	// 	const x = d3.scaleTime()
	// 		.domain(d3.extent(CountsByDate, (d) => d.date))
	// 		.range([0, width])
		
		// svg.append('g').attr('tranform', 'translate(0,' + + height + ')')

		// const max = d3.max(CountsByDate, (d) => d.count)

		// 		// y axis scale 
		// 		const y = d3.scaleLinear()
		// 					.domain([0, max])
		// 					.range([height,0])

	// 			svg.append('g')
	// 				.call(d3.axisLeft(y))


	// 			// Draw line
	// 			svg.append('path')
	// 				.datum(CountsByDate)
	// 				.attr('fill', 'none')
	// 				.attr('stroke','white')
	// 				.attr('stroke-width', 3)
	// 				.attr('d', d3.line()
	// 							.x((d) => x(d.date))
	// 							.y((d) => y(d.count))
	// 					)

	// 			// Add title 
	// 			svg.append('text')
	// 				.attr('x',(width/2))
	// 				.attr('y', (margin.top/5 - 10))
	// 				.attr('text-anchor', 'middle')
	// 				.attr('font-size', '16px')
	// 				.attr('fill','white')
	// 				.text('New York City Film Permits entered in 2020 - Shooting Permit')

		
		
    }, []);

    return (
        <div className="d3chart">
            <svg ref={d3Chart}></svg>
        </div>
    );
};

export default Chart;
