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

        // Clear errors from previous updates
        this.clearErrors();

        // Throw errors and exit if the shape of the data isn't what this chart requires
        // if (data.length === 0) {
        //     this.addError({ title: "No Results" });
        //     done();
        //     return;
        // }

        //   if (queryResponse.fields.dimensions.length == 0) {
        //     this.addError({title: "No Dimensions", message: "This chart requires dimensions."}); // error
        //     return; // exit
        //   }

        console.log(queryResponse, data) // see everything returned by Looker

        this.iframe.src = 'https://console.azr.internal.wayve.ai/segments-viewer?show-segments-details=true&autoplay=false&segments=W3sicnVuX2lkIjoibmVyZXVzLzIwMjItMTAtMTAtLTA3LTM3LTMwLS1zZXNzaW9uXzIwMjJfMTBfMDZfMDhfNTFfNTZfaG9zdF9uaWtoaWxfZmFzdF9jaGVja3BvaW50IiwiZnJvbV91bml4dXMiOjE2NjUzODgwMDYwMDgwMjcsInRvX3VuaXh1cyI6MTY2NTM4ODAwODk2NjUwMiwibGFiZWxzIjpbXX0seyJydW5faWQiOiJzZWRuYS8yMDIyLTEwLTA3LS0xNC0wMS00MS0tc2Vzc2lvbl8yMDIyXzA5XzAyXzA3XzU2XzAzX2hvc3RfemFrX3dheXZlX2V4dC1hY2MtZGF0YTEiLCJmcm9tX3VuaXh1cyI6MTY2NTE1MzUxOTAzMzYzOSwidG9fdW5peHVzIjoxNjY1MTUzNTIyMTk3NzExLCJsYWJlbHMiOltdfSx7InJ1bl9pZCI6Im95YS8yMDIyLTEwLTA2LS0xMi00MS00OS0tc2Vzc2lvbl8yMDIyXzA4XzEyXzE3XzAyXzU5X2FtbC1hMTAwbTgwZ2ItMW5uX3NlYW5fYmlnd2F5dmVfMnhfaGlyZXMiLCJmcm9tX3VuaXh1cyI6MTY2NTA2MTE5MjAwNjMwNiwidG9fdW5peHVzIjoxNjY1MDYxMTk1MDQzOTcwLCJsYWJlbHMiOltdfSx7InJ1bl9pZCI6InNlZG5hLzIwMjItMTAtMDUtLTE1LTU3LTIyLS1zZXNzaW9uXzIwMjJfMDhfMTJfMTdfMDJfNTlfYW1sLWExMDBtODBnYi0xbm5fc2Vhbl9iaWd3YXl2ZV8yeF9oaXJlcyIsImZyb21fdW5peHVzIjoxNjY0OTg2NDYzMTY3OTA2LCJ0b191bml4dXMiOjE2NjQ5ODY0Njc5NzA0MTcsImxhYmVscyI6W119LHsicnVuX2lkIjoic2VkbmEvMjAyMi0xMC0wNS0tMTMtNDktMDItLXNlc3Npb25fMjAyMl8wOF8xMl8xN18wMl81OV9hbWwtYTEwMG04MGdiLTFubl9zZWFuX2JpZ3dheXZlXzJ4X2hpcmVzIiwiZnJvbV91bml4dXMiOjE2NjQ5Nzg4OTYwMDkxMTYsInRvX3VuaXh1cyI6MTY2NDk3ODg5ODA4ODE1OSwibGFiZWxzIjpbXX0seyJydW5faWQiOiJzZWRuYS8yMDIyLTEwLTA1LS0xMy00OS0wMi0tc2Vzc2lvbl8yMDIyXzA4XzEyXzE3XzAyXzU5X2FtbC1hMTAwbTgwZ2ItMW5uX3NlYW5fYmlnd2F5dmVfMnhfaGlyZXMiLCJmcm9tX3VuaXh1cyI6MTY2NDk3ODg3NzAwNjIxMSwidG9fdW5peHVzIjoxNjY0OTc4ODc5OTYzOTAzLCJsYWJlbHMiOltdfV0=';
        // iframe.allowfullscreen="true"
        // iframe.webkitallowfullscreen="true"
        // iframe.mozallowfullscreen="true"
        // Let Looker know rendering is complete
        done()
    }
});