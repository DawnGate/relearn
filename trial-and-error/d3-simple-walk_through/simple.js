console.log("Hello");

// selections
d3.select(".p_select").style("color", "blue");

d3.selectAll(".p_select_all").style("color", "red");

// data driven

const fruits = ["Apple", "Orange", "Mango"];

d3.select("#p_data_join")
  .data(fruits)
  .text((f) => f);

d3.select("#div_data_join_2")
  .selectAll("p")
  .data(fruits)
  .join("p")
  .attr("class", "d3_fruit")
  .style("color", "blue")
  .text((f) => f);

d3.json(
  "https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/articles.json"
).then((res) => {
  d3.select("#div_data_loading")
    .selectAll("p")
    .data(res)
    .join("p")
    .text((article) => article.title);
});

// scales in d3

// create bar chart
function barChart() {
  let width = 960;
  let height = 500;

  const x_scale = d3.scaleBand().range([0, width]).padding(0.1);
  const y_scale = d3.scaleLinear().range([height, 0]);

  const svgChart = d3
    .select("#svg_bar_chart")
    .attr("height", height)
    .attr("width", width);

  d3.json(
    "https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/nigeria-states.json"
  )
    .then((res) => res.data)
    .then((data) => {
      const formattedData = data.map((i) => {
        return {
          ...i,
          population: +i.info.Population,
        };
      });
      x_scale.domain(formattedData.map((i) => i.Name));
      y_scale.domain([0, d3.max(formattedData.map((i) => i.population))]);

      svgChart
        .selectAll("rect")
        .data(formattedData)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x_scale(d.Name))
        .attr("y", (d) => y_scale(d.population))
        .attr("width", x_scale.bandwidth())
        .attr("height", (d) => height - y_scale(d.population))
        .style("fill", "green");
    });
}
barChart();

function linearChart() {
  const width = 200;
  const height = 200;

  const svgChart = d3
    .select("#svg_linear_demo")
    .attr("width", width)
    .attr("height", height);

  const scale = d3.scaleLinear().domain([0, 100]).range([0, width]);

  const bottomAxis = d3.axisBottom(scale);
  const topAxis = d3.axisTop(scale);

  svgChart.append("g").call(bottomAxis);
  svgChart.append("g").call(topAxis);
}
linearChart();

function marginChart() {
  const height = 500;
  const width = document.querySelector("body").clientWidth;

  const margin = {
    top: 20,
    right: 30,
    bottom: 55,
    left: 70,
  };

  const svgChart = d3
    .select("#svg_margin_convention")
    .attr("viewBox", [0, 0, width, height]);

  const x_scale = d3
    .scaleBand()
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y_scale = d3.scaleLinear().range([height - margin.bottom, margin.top]);

  const xAxis = d3.axisBottom(x_scale);
  const yAxis = d3.axisLeft(y_scale);

  d3.json(
    "https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/nigeria-states.json"
  )
    .then((res) => res.data)
    .then((data) => {
      const formattedData = data.map((i) => {
        return {
          ...i,
          population: +i.info.Population,
        };
      });

      x_scale.domain(formattedData.map((i) => i.Name));
      y_scale.domain([0, d3.max(formattedData.map((i) => i.population))]);

      svgChart
        .selectAll("rect")
        .data(formattedData)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x_scale(d.Name))
        .attr("y", (d) => y_scale(d.population))
        .attr("width", x_scale.bandwidth())
        .attr("height", (d) => height - margin.bottom - y_scale(d.population))
        .style("fill", "green");

      svgChart
        .append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-10px")
        .attr("dy", "0px")
        .attr("transform", "rotate(-45)");
      svgChart
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);
    });
}

marginChart();

// create a map

function mapChart() {
  const margin = {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  };

  const height = 500;
  const width = document.querySelector("body").clientWidth;

  const svgChart = d3.select("#svg_map").attr("viewBox", [0, 0, width, height]);

  const projection = d3.geoEquirectangular().center([0, 0]);
  const pathGenerator = d3.geoPath().projection(projection);

  let g = svgChart.append("g");

  let tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  svgChart
    .append("text")
    .attr("x", width / 1.4)
    .attr("y", height - 20)
    .style("font-size", "20px")
    .style("text-decoration", "underline")
    .text("Map of nigeria and it's states");

  // https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/countries-110m.geojson
  // https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/nigeria_state_boundaries.geojson

  Promise.all([
    d3.json(
      "https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/nigeria-states.json"
    ),
    d3.json(
      "https://raw.githubusercontent.com/iamspruce/intro-d3/main/data/nigeria_state_boundaries.geojson"
    ),
  ]).then(([countryData, geoJSONdata]) => {
    countryData.data.forEach((d) => {
      d.info.Latitude = +d.info.Latitude;
      d.info.Longitude = +d.info.Longitude;
    });

    projection.fitSize([width, height], geoJSONdata);

    g.selectAll("path")
      .data(geoJSONdata.features)
      .join("path")
      .attr("class", "country")
      .attr("d", pathGenerator);

    g.selectAll("circle")
      .data(countryData.data)
      .join("circle")
      .attr("cx", (d) => projection([d.info.Longitude, d.info.Latitude])[0])
      .attr("cy", (d) => projection([d.info.Longitude, d.info.Latitude])[1])
      .attr("r", 5)
      .style("fill", "green")
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip
          .html(`<p>Population: ${d.info.Population}</p><p>Name: ${d.Name}</p>`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", (d) => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    g.selectAll("text")
      .data(countryData.data)
      .join("text")
      .attr("x", (d) => projection([d.info.Longitude, d.info.Latitude])[0])
      .attr("y", (d) => projection([d.info.Longitude, d.info.Latitude])[1])
      .attr("dy", -7)
      .style("fill", "red")
      .attr("text-anchor", "middle")
      .text((d) => d.Name);

    const zooming = d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        console.log(event);
        g.selectAll("path").attr("transform", event.transform);
        g.selectAll("circle")
          .attr("transform", event.transform)
          .attr("r", 5 / event.transform.k);

        g.selectAll("text")
          .attr("transform", event.transform)
          .attr("font-size", 18 / event.transform.k)
          .attr("dy", -7 / event.transform.k);
      });

    svgChart.call(zooming);
  });
}

mapChart();
