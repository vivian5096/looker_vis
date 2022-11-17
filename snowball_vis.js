// https://github.com/looker-open-source/custom_visualizations_v2/blob/master/docs/api_reference.md
// https://plotly.com/javascript/getting-started/
// https://plotly.com/javascript/plotlyjs-function-reference/#plotlynewplot

looker.plugins.visualizations.add({
    // Options for user to choose in the "edit" part of looker vis
    // In this example, whether the plot is bar or scatter
    options: {},

    // Set up the initial state of the visualization
    create: function (element, config) {
        this.iframe = element.appendChild(document.createElement("iframe"));
        this.iframe.height="100%"
        this.iframe.width="100%"
    },


    updateAsync: function (data, element, config, queryResponse, details, done) { // Update everytime data/settings change
        console.log(queryResponse) // see everything returned by Looker

        // Clear errors from previous updates
        this.clearErrors();

        // Throw errors and exit if the shape of the data isn't what this chart requires
        trial_uid_key = 'trials_denormalised.trial_uid'
        if (queryResponse.fields.dimensions.find(d => d.name === trial_uid_key)) {
            this.addError({title: 'Invalid Input.', message: `This chart requires dimension - ${trial_uid_key}.`});
            return;
        }

        this.iframe.src = `https://console.azr.internal.wayve.ai/segments-viewer?show-segments-details=true&trial-uids=${data.map(d => d[trial_uid_key].value).join(',')}`;

        // Let Looker know rendering is complete
        done()
    }
});