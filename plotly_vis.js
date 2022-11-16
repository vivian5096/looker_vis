// https://github.com/looker-open-source/custom_visualizations_v2/blob/master/docs/api_reference.md
// https://plotly.com/javascript/getting-started/
// https://plotly.com/javascript/plotlyjs-function-reference/#plotlynewplot

looker.plugins.visualizations.add({
    // Options for user to choose in the "edit" part of looker vis
    // In this example, whether the plot is bar or scatter
    options: {
        graph_type: {
            type: "string",
            label: "Plot type",
            values: [
                { "Scatter": "scatter" },
                { "Bar": "bar" },
                // {"3d": "surface"},
            ],
            display: "radio",
            default: "scatter"
        },
        xaxis_label: {
            type: "string",
            label: "x axis label",
        },
        yaxis_label: {
            type: "string",
            label: "y axis label",
        },
        inverse_log: {
            type: "boolean",
            label: "Scale y by inverse log",
            default: false,
        }
    },

    // Set up the initial state of the visualization
    create: function (element, config) {

        // import scripts to allow math operations
        var mathjs_script = document.createElement("script");
        // import scripts to build that vis
        var plotly_script = document.createElement("script");

        window.scriptLoad = Promise.all([
            new Promise(load => mathjs_script.onload = load),
            new Promise(load => plotly_script.onload = load),
        ])

        mathjs_script.src = "https://pagecdn.io/lib/mathjs/11.0.1/math.min.js";
        plotly_script.src = "https://cdn.plot.ly/plotly-2.14.0.min.js";

        mathjs_script.type = "text/javascript";
        plotly_script.type = "text/javascript";

        document.head.appendChild(mathjs_script)
        document.head.appendChild(plotly_script)

        // Insert a <style> tag with class to keep stuff centered.
        element.innerHTML = `
        <style>
          .container_style {
            /* Vertical centering */
            height: 90%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            top: 0px;
            margin: 0;
          }
          .container_style > .plot-container {
              height: 100%;
          }
        </style>
      `;

        // Create the container element with that class to let us center the vis.
        var container = element.appendChild(document.createElement("div"));
        container.className = "container_style";
        this.plotly_bit = container;

    },


    updateAsync: function (data, element, config, queryResponse, details, done) { // Update everytime data/settings change

        // Clear errors from previous updates
        this.clearErrors();

        // Throw errors and exit if the shape of the data isn't what this chart requires
        if (queryResponse.fields.dimensions.length == 0) {
            this.addError({ title: "No Dimensions", message: "This chart requires dimensions." }); // error
            return; // exit
        }

        console.log(queryResponse) // see everything returned by Looker

        window.scriptLoad.then(() => { // Do this first to ensure js loads in time

            var x = []
            var y = []

            first_dim = queryResponse.fields.dimensions[0]
            first_mea = queryResponse.fields.measures[0]

            for (var row of data) { // for each row in data
                var x_i = row[first_dim.name]; // take first dimension
                var y_i = row[first_mea.name]; // take first measure
                x.push(x_i['value']); // append to array
                y.push(y_i['value']); // append to array
            }

            if (config.xaxis_label) {
                xaxis_label = config.xaxis_label
            } else {
                xaxis_label = first_dim.field_group_label
            }

            if (config.yaxis_label) {
                yaxis_label = config.yaxis_label
            } else {
                yaxis_label = first_mea.field_group_label
            }

            plotly_data = [{
                x: x,
                y: y,
                type: config.graph_type // Set the type to the user-selected graph type
            }]

            layout = {
                margin: { t: 0 },
                title: 'Click Here to Edit Chart Title',
                xaxis: { title: { text: xaxis_label } },
                yaxis: { title: { text: yaxis_label } },
            }

            if (config.inverse_log == true) {

                // create scaled version of y
                y_m = math.multiply(
                    math.log10(
                        math.add( // equivalent to 1-y
                            1,
                            math.multiply(
                                math.matrix(y), // convert y to mathjs vector
                                -1
                            )
                        )
                    ),
                    -1
                )

                // Set hover-text with original value of y
                plotly_data[0]['text'] = y
                plotly_data[0]['hovertemplate'] = '<b>%{text}</b>'
                // Overwrite y with scaled y
                plotly_data[0]['y'] = y_m._data

                // Overide yaxis labels
                layout['yaxis'] = {
                    title: { text: yaxis_label },
                    tickmode: 'array',
                    tickvals: [0, 1, 2, 3],
                    ticktext: [0, 0.9, 0.99, 0.999],
                    range: [0, 3.1]
                }

            }

            config = {
                // editable: true, // allow user to edit axes by clicking on them
                responsive: true
            }

            Plotly.newPlot( // use plotly library
                this.plotly_bit, // graphDiv
                plotly_data,
                layout,
                config
            )

        })

        // Let Looker know rendering is complete
        done()
    }
});