Split(['#ConfigureMenu', '#MiddlePortion', '#Player'], {
    elementStyle: function (dimension, size) { 
        return {'width': + size + 'vw'};
    },
    sizes: [10,80,10],
    gutterSize: 3,
    gutterStyle: function (dimension, gutterSize) {
        return {
            'flex-basis': gutterSize + 'px',
        }
    },
})

Split(['#MediaDisplay', '#JudgeClickerDir'], {
    direction: 'vertical',
    gutterAlign: 'start',
    elementStyle: function (dimension, size) { 
        return {'height': + size + '%'};
    },
    sizes: [85, 15],
    gutterSize: 3,
    gutterStyle: function (dimension, gutterSize) {
        return {
            'flex-basis': gutterSize + 'px',
        }
    },
})
